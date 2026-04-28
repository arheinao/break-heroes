import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CITIES_PATH = resolve(__dirname, "../src/data/beevago-destinations.json");
const CURATED_PATH = resolve(__dirname, "../src/data/origin-markets.json");
const OUTPUT = resolve(__dirname, "../src/data/auto-origin-markets.json");

function flagEmoji(cc) {
  if (cc.length !== 2) return "";
  return [...cc.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

const cities = JSON.parse(await readFile(CITIES_PATH, "utf8"));
const curated = JSON.parse(await readFile(CURATED_PATH, "utf8"));
const curatedCodes = new Set(curated.map((m) => m.code));

const seen = new Map();
for (const c of cities) {
  if (!seen.has(c.countryCode)) {
    seen.set(c.countryCode, { name: c.countryName, code: c.countryCode });
  }
}

const auto = [];
for (const { code, name } of seen.values()) {
  if (curatedCodes.has(code)) continue;
  auto.push({
    code,
    name,
    flag: flagEmoji(code),
    schoolBreaks: [],
    auto: true,
  });
}

auto.sort((a, b) => a.name.localeCompare(b.name));

await writeFile(OUTPUT, JSON.stringify(auto, null, 2) + "\n", "utf8");

console.log(
  "Generated " +
    auto.length +
    " auto origin markets (curated: " +
    curated.length +
    ", total: " +
    (auto.length + curated.length) +
    ")."
);
console.log("Output: " + OUTPUT);
