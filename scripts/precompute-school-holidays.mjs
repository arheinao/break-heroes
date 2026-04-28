#!/usr/bin/env node
/**
 * Normalize curated school holiday JSONs (sourced from beevago) into a flat
 * per-market × per-year structure the scoring engine can consume.
 *
 * Input JSON schemas observed across beevago's dataset:
 *
 *   1. National-only (HR, VN, SA, KR, PH, AE, JP):
 *        schoolHolidays: { "YYYY-YYYY": [...] }  // or "YYYY"
 *
 *   2. Regional-only (AT, DE, IT, ES, CN, IN, GB):
 *        regionalSchoolHolidays: {
 *          REG: { stateName, semesterGroup, "YYYY-YYYY": [...] }
 *        }
 *
 *   3. School-type split (SG, ES, HU, RS):
 *        schoolHolidays: {
 *          "primary_secondary": { "YYYY": [...] },
 *          "junior_college":    { "YYYY": [...] }
 *        }
 *
 *   4. Zones (FR, MY):
 *        schoolHolidays: {
 *          "national": { "YYYY-YYYY": [...] },
 *          "zone_a":   { "YYYY-YYYY": [...] }
 *        }
 *
 *   5. Hybrid (NL, JP): both schoolHolidays AND regionalSchoolHolidays present
 *
 * Strategy: recursive walker. Find every leaf array of {startDate, endDate}
 * objects regardless of how deeply nested. Record the path so calendar
 * groups and regions stay attached to each entry.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const inputDir = path.join(ROOT, "src/data/school-holidays");
const outDir = path.join(ROOT, "src/data/precomputed");
fs.mkdirSync(outDir, { recursive: true });

// Keys that are metadata on a region/zone object, never date payloads
const METADATA_KEYS = new Set([
  "stateName",
  "semesterGroup",
  "summerGroup",
  "zoneName",
  "academies",
  "type",
  "note",
  "notes",
  "variations",
  "description",
  "metadata",
  "source",
  "sources",
]);

function* walk(node, trail = []) {
  if (Array.isArray(node)) {
    for (const entry of node) {
      if (entry && typeof entry === "object" && entry.startDate && entry.endDate) {
        yield { entry, trail };
      }
    }
    return;
  }

  if (!node || typeof node !== "object") return;

  for (const [key, value] of Object.entries(node)) {
    if (METADATA_KEYS.has(key)) continue;
    yield* walk(value, [...trail, key]);
  }
}

function classifyTrail(trail) {
  const calendarGroup = [];
  const region = [];
  for (const seg of trail) {
    const s = String(seg);
    // Year range or bare year → not a label, skip
    if (/^\d{4}(-\d{4})?$/.test(s)) continue;
    // Heuristics: lowercase_with_underscores tends to be calendar group
    // (primary_secondary, zone_a, national); uppercase is region code
    if (/^[A-Z]{2,4}$/.test(s) || /^[A-Z][a-z]/.test(s)) {
      region.push(s);
    } else {
      calendarGroup.push(s);
    }
  }
  return {
    calendarGroup: calendarGroup.join(":") || null,
    region: region.join(":") || null,
  };
}

const files = fs
  .readdirSync(inputDir)
  .filter((f) => f.endsWith(".json"));

const markets = {};

for (const file of files) {
  const cc = file.replace(".json", "");
  const raw = JSON.parse(fs.readFileSync(path.join(inputDir, file), "utf8"));

  const perYear = {};
  const dedup = new Set();

  for (const source of ["schoolHolidays", "regionalSchoolHolidays"]) {
    const root = raw[source];
    if (!root) continue;

    for (const { entry, trail } of walk(root)) {
      const { calendarGroup, region } = classifyTrail(trail);
      const year = entry.startDate.slice(0, 4);

      const dedupKey = `${entry.key ?? entry.name}|${entry.startDate}|${entry.endDate}|${region ?? ""}|${calendarGroup ?? ""}`;
      if (dedup.has(dedupKey)) continue;
      dedup.add(dedupKey);

      if (!perYear[year]) perYear[year] = [];
      perYear[year].push({
        key: entry.key ?? slugify(entry.name),
        name: entry.name,
        start: entry.startDate,
        end: entry.endDate,
        calendarGroup,
        region,
        source,
      });
    }
  }

  // Sort each year chronologically
  for (const year of Object.keys(perYear)) {
    perYear[year].sort((a, b) => a.start.localeCompare(b.start));
  }

  markets[cc] = {
    schoolHolidayType: raw.metadata?.schoolHolidayType ?? "unknown",
    years: perYear,
  };
}

function slugify(name) {
  return (name ?? "break")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 60);
}

const output = {
  generatedAt: new Date().toISOString(),
  markets,
};

fs.writeFileSync(
  path.join(outDir, "school-holidays.json"),
  JSON.stringify(output, null, 2),
);

const counts = Object.entries(markets)
  .map(([cc, { schoolHolidayType, years }]) => {
    const total = Object.values(years).reduce(
      (sum, arr) => sum + arr.length,
      0,
    );
    return `${cc}(${schoolHolidayType}):${total}`;
  })
  .join(" ");

console.log(
  `[precompute] Wrote school-holidays.json · ${Object.keys(markets).length} markets · ${counts}`,
);
