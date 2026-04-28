import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CITIES_PATH = resolve(__dirname, "../src/data/beevago-destinations.json");
const CURATED_PATH = resolve(__dirname, "../src/data/destinations.json");
const OUTPUT = resolve(__dirname, "../src/data/auto-destinations.json");

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const PLEASANT = new Set(["warm-pleasant", "warm-sunny", "mild-pleasant"]);
const HARSH = new Set([
  "cool-rainy",
  "cool-damp",
  "freezing",
  "hot-humid",
  "very-hot",
  "monsoon",
]);

const GRADIENTS = [
  ["#fecaca", "#fca5a5"],
  ["#fef3c7", "#fde68a"],
  ["#dcfce7", "#bbf7d0"],
  ["#dbeafe", "#bfdbfe"],
  ["#ede9fe", "#ddd6fe"],
  ["#fce7f3", "#fbcfe8"],
  ["#cffafe", "#a5f3fc"],
  ["#fef9c3", "#fde68a"],
  ["#fee2e2", "#fecaca"],
  ["#e0e7ff", "#c7d2fe"],
  ["#f0fdf4", "#bbf7d0"],
  ["#fff7ed", "#fed7aa"],
];

function flagEmoji(cc) {
  if (cc.length !== 2) return "";
  return [...cc.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

function gradientFor(cc) {
  let h = 0;
  for (const c of cc) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

function classifyWindow(w) {
  const pleasant = w.conditions ? PLEASANT.has(w.conditions) : false;
  const harsh = w.conditions ? HARSH.has(w.conditions) : false;
  const peakCrowd = w.crowds === "very-high";
  const peakPrice = w.priceLevel === "very-high";
  if (pleasant && !peakCrowd) return "best";
  if (harsh || (peakCrowd && peakPrice)) return "poor";
  return "ok";
}

function rank(c) {
  return c === "best" ? 2 : c === "ok" ? 1 : 0;
}

function aggregateMonths(citiesInCountry) {
  const counts = {};
  for (const m of MONTHS) counts[m] = { best: 0, ok: 0, poor: 0 };

  for (const city of citiesInCountry) {
    // for each month in this city, take best across its windows
    const cityMonth = {};
    for (const w of city.visitWindows ?? []) {
      const c = classifyWindow(w);
      for (const i of w.monthsArray ?? []) {
        const label = MONTHS[i - 1];
        if (!label) continue;
        if (!cityMonth[label] || rank(c) > rank(cityMonth[label])) {
          cityMonth[label] = c;
        }
      }
    }
    for (const m of MONTHS) counts[m][cityMonth[m] ?? "poor"] += 1;
  }

  const best = [];
  const ok = [];
  const poor = [];
  for (const m of MONTHS) {
    const { best: b, ok: o, poor: p } = counts[m];
    const total = b + o + p;
    if (b / total >= 0.5) best.push(m);
    else if ((b + o) / total >= 0.5) ok.push(m);
    else poor.push(m);
  }
  return { best, ok, poor };
}

const cities = JSON.parse(await readFile(CITIES_PATH, "utf8"));
const curated = JSON.parse(await readFile(CURATED_PATH, "utf8"));
const curatedSlugs = new Set(curated.map((c) => c.slug));

const byCountry = new Map();
for (const c of cities) {
  if (!byCountry.has(c.countrySlug)) byCountry.set(c.countrySlug, []);
  byCountry.get(c.countrySlug).push(c);
}

const auto = [];
for (const [slug, cs] of byCountry) {
  if (curatedSlugs.has(slug)) continue;
  const cc = cs[0].countryCode;
  const name = cs[0].countryName;
  const { best, ok, poor } = aggregateMonths(cs);

  const tagline =
    cs.length === 1
      ? `${cs[0].name} timing intelligence — month-by-month breakdown.`
      : `${cs.length} destinations across ${name}, with month-by-month timing.`;

  auto.push({
    slug,
    name,
    flag: flagEmoji(cc),
    countryCode: cc,
    tagline,
    gradient: gradientFor(cc),
    bestMonths: best,
    okMonths: ok,
    poorMonths: poor,
    majorDisruptions: [],
    weather: { summary: "" },
    highlights: [],
    auto: true,
  });
}

auto.sort((a, b) => a.slug.localeCompare(b.slug));

await writeFile(OUTPUT, JSON.stringify(auto, null, 2) + "\n", "utf8");

console.log(
  "Generated " +
    auto.length +
    " auto country entries (curated: " +
    curated.length +
    ", total: " +
    (auto.length + curated.length) +
    ")."
);
console.log("Output: " + OUTPUT);
