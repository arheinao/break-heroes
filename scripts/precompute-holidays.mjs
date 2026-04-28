#!/usr/bin/env node
/**
 * Precompute public holidays for each destination and origin market.
 * Runs at build time. Emits normalized JSON the scoring engine can consume.
 *
 * Normalized output shape (kept deliberately simple):
 *   {
 *     generatedAt: ISO string,
 *     years: [N, N+1, N+2],
 *     countries: {
 *       [CC]: {
 *         [year]: [
 *           { key, name, date, type, impactHint }
 *         ]
 *       }
 *     }
 *   }
 *
 * Why a single file: total size for 15 countries × 3 years stays under 200KB,
 * tree-shaken per page import, and avoids many small file reads during build.
 */

import Holidays from "date-holidays";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const destinations = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/data/destinations.json"), "utf8"),
);
const originMarkets = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/data/origin-markets.json"), "utf8"),
);

const currentYear = new Date().getFullYear();
const YEARS = [currentYear, currentYear + 1, currentYear + 2];

const countryCodes = new Set([
  ...destinations.map((d) => d.countryCode),
  ...originMarkets.map((o) => o.code),
]);

function impactHintFor(holiday) {
  const name = (holiday.name || "").toLowerCase();
  const type = (holiday.type || "").toLowerCase();

  if (type === "observance") return "low";
  if (type === "optional") return "low";

  if (
    /(new year|christmas|easter|golden week|obon|tet|lunar new year|songkran|ramadan|eid)/.test(
      name,
    )
  ) {
    return "high";
  }
  if (/(bank holiday|public holiday|national)/.test(type)) return "medium";
  return "medium";
}

const countries = {};

for (const cc of countryCodes) {
  const hd = new Holidays();
  hd.init(cc, { languages: ["en"] });
  const perYear = {};

  for (const year of YEARS) {
    const holidays = hd.getHolidays(year) || [];
    perYear[year] = holidays
      .filter((h) => h.type !== "observance")
      .map((h, idx) => ({
        key: slugify(h.name) || `${cc.toLowerCase()}_${year}_${idx}`,
        name: h.name,
        date: h.date.slice(0, 10),
        type: h.type,
        impactHint: impactHintFor(h),
      }));
  }

  countries[cc] = perYear;
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 60);
}

const output = {
  generatedAt: new Date().toISOString(),
  years: YEARS,
  countries,
};

const outDir = path.join(ROOT, "src/data/precomputed");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "public-holidays.json"),
  JSON.stringify(output, null, 2),
);

const counts = Object.entries(countries)
  .map(([cc, years]) => {
    const total = Object.values(years).reduce((sum, arr) => sum + arr.length, 0);
    return `${cc}:${total}`;
  })
  .join(" ");

console.log(
  `[precompute] Wrote public-holidays.json · ${countryCodes.size} countries · years ${YEARS.join(",")} · ${counts}`,
);
