import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE = resolve(
  __dirname,
  "../../beevago-nextjs/src/app/config/destinations.js"
);
const OUTPUT = resolve(__dirname, "../src/data/beevago-destinations.json");

const COUNTRY_SLUG_OVERRIDES = {
  GB: "united-kingdom",
  US: "united-states",
  AE: "uae",
  KR: "south-korea",
};

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function countrySlugFor(code) {
  if (COUNTRY_SLUG_OVERRIDES[code]) return COUNTRY_SLUG_OVERRIDES[code];
  const name = regionNames.of(code);
  if (!name || name === code) return null;
  return slugify(name);
}

function countryNameFor(code) {
  return regionNames.of(code) ?? code;
}

function trim(entry) {
  const primaryCountryCode = entry.countryCode.split("_")[0];
  const countrySlug = countrySlugFor(primaryCountryCode);
  if (!countrySlug) return null;

  const slug = entry.nameKey ? slugify(entry.nameKey) : slugify(entry.name);

  return {
    id: entry.id,
    slug,
    name: entry.name,
    countryCode: primaryCountryCode,
    countrySlug,
    countryName: countryNameFor(primaryCountryCode),
    continent: entry.continent,
    hemisphere: entry.hemisphere,
    image: entry.image
      ? entry.image.replace(/^\/destinations\//, "/img/destinations/")
      : entry.image,
    description: entry.description,
    bestTime: entry.bestTime,
    minDays: entry.minDays,
    maxDays: entry.maxDays,
    iataCity: entry.iataCity,
    iataAirports: entry.iataAirports,
    visitWindows: (entry.visitWindows ?? []).map((w) => ({
      months: w.months,
      monthsArray: w.monthsArray,
      temperature: w.temperature,
      conditions: w.weather?.conditions,
      rainfall: w.weather?.rainfall,
      sunnyDays: w.weather?.sunnyDays,
      localSeason: w.localSeason,
      bestFor: w.bestFor,
      crowds: w.crowds,
      priceLevel: w.priceLevel,
      localVibe: w.localVibe,
    })),
    attractions: (entry.attractions ?? []).map((a) => ({
      id: a.id,
      name: a.name,
      category: a.category,
      description: a.description,
      duration: a.duration,
      priceRange: a.priceRange,
    })),
  };
}

const mod = await import(SOURCE);
const source = mod.destinations;

if (!Array.isArray(source)) {
  console.error("Expected `destinations` array export from", SOURCE);
  process.exit(1);
}

const trimmed = [];
const skipped = [];
for (const entry of source) {
  const t = trim(entry);
  if (t) trimmed.push(t);
  else skipped.push(entry.name + " (" + entry.countryCode + ")");
}

trimmed.sort((a, b) => a.countrySlug.localeCompare(b.countrySlug) || a.slug.localeCompare(b.slug));

await writeFile(OUTPUT, JSON.stringify(trimmed, null, 2) + "\n", "utf8");

const byCountry = new Map();
for (const t of trimmed) {
  byCountry.set(t.countrySlug, (byCountry.get(t.countrySlug) ?? 0) + 1);
}

console.log("Imported " + trimmed.length + " destinations across " + byCountry.size + " countries.");
console.log("Output: " + OUTPUT);
if (skipped.length) {
  console.log("\nSkipped (unresolved country code):");
  for (const s of skipped) console.log("  - " + s);
}
