import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WP_API = process.env.WORDPRESS_API_URL ?? "https://cms.beevago.com";
const PUBLIC_SITE = process.env.BEEVAGO_PUBLIC_SITE ?? "https://www.beevago.com";
const LANGS = (process.env.BEEVAGO_LANGS ?? "en,de,es")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const PER_PAGE = 100;

function outputPath(lang) {
  return resolve(__dirname, `../src/data/beevago-posts.${lang}.json`);
}

function authHeader() {
  const u = process.env.WORDPRESS_USERNAME;
  const p = process.env.WORDPRESS_APP_PASSWORD;
  if (!u || !p) return null;
  return "Basic " + Buffer.from(`${u}:${p}`).toString("base64");
}

function buildHeaders() {
  const h = {
    Accept: "application/json",
    "User-Agent": "break-heroes-fetcher/1.0",
  };
  const auth = authHeader();
  if (auth) h["Authorization"] = auth;
  if (process.env.WORDPRESS_SECRET_KEY) {
    h["X-Beevago-Secret"] = process.env.WORDPRESS_SECRET_KEY;
  }
  return h;
}

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "'",
  rsquo: "'",
  ldquo: '"',
  rdquo: '"',
  laquo: "«",
  raquo: "»",
  copy: "©",
  reg: "®",
  trade: "™",
};

function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&([a-zA-Z]+);/g, (m, name) => NAMED_ENTITIES[name] ?? m);
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

function extractTerms(post, taxonomy) {
  const groups = post._embedded?.["wp:term"] ?? [];
  for (const g of groups) {
    if (g[0]?.taxonomy === taxonomy) {
      return g.map((t) => ({ name: t.name, slug: t.slug }));
    }
  }
  return [];
}

function countryCodeFromTerm(slug) {
  const m = slug.match(/^country-([a-z]{2})$/i);
  return m ? m[1].toUpperCase() : null;
}

async function fetchPage(lang, page) {
  const url = `${WP_API}/wp-json/wp/v2/posts?per_page=${PER_PAGE}&page=${page}&lang=${lang}&_embed=1&_fields=id,slug,date,title,excerpt,featured_media,_links,_embedded`;
  const res = await fetch(url, { headers: buildHeaders() });
  if (!res.ok) {
    throw new Error(`[${lang}] Failed page ${page}: ${res.status} ${res.statusText}`);
  }
  const totalPages = Number(res.headers.get("x-wp-totalpages")) || 1;
  const posts = await res.json();
  return { posts, totalPages };
}

async function fetchLang(lang) {
  console.log(`\n=== Fetching lang=${lang} ===`);
  const all = [];
  let page = 1;
  while (true) {
    const { posts, totalPages } = await fetchPage(lang, page);
    all.push(...posts);
    process.stdout.write(`  page ${page}/${totalPages} (${posts.length} posts)\n`);
    if (page >= totalPages) break;
    page += 1;
  }

  const trimmed = all.map((p) => {
    const featured = p._embedded?.["wp:featuredmedia"]?.[0];
    const image = featured?.source_url ?? null;
    const destinations = extractTerms(p, "destinations").map((t) => t.slug);
    const countryCodes = extractTerms(p, "country-codes")
      .map((t) => countryCodeFromTerm(t.slug))
      .filter(Boolean);

    return {
      id: p.id,
      slug: p.slug,
      date: p.date,
      title: stripTags(p.title?.rendered ?? ""),
      excerpt: stripTags(p.excerpt?.rendered ?? ""),
      url: `${PUBLIC_SITE}/${lang}/blog/${p.slug}`,
      image,
      destinations,
      countryCodes,
    };
  });

  trimmed.sort((a, b) => (a.date < b.date ? 1 : -1));

  const out = outputPath(lang);
  await writeFile(out, JSON.stringify(trimmed, null, 2) + "\n", "utf8");

  const cityCount = new Set();
  const countryCount = new Set();
  for (const p of trimmed) {
    p.destinations.forEach((d) => cityCount.add(d));
    p.countryCodes.forEach((c) => countryCount.add(c));
  }

  console.log(`  → ${trimmed.length} posts (${cityCount.size} cities, ${countryCount.size} countries) → ${out}`);
}

async function main() {
  for (const lang of LANGS) {
    try {
      await fetchLang(lang);
    } catch (err) {
      console.error(err);
      console.error(`Skipping ${lang} due to error.`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
