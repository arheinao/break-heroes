#!/usr/bin/env node
/**
 * Compare beevago's curated public-holiday rules vs `date-holidays` for the
 * same country × year set. Emits a markdown report showing overlap and each
 * side's unique entries.
 *
 * Rather than importing beevago's full 963-line calculator (which has a
 * pre-existing broken import unrelated to this task), this script resolves
 * the common rule categories directly from beevago's JSON:
 *
 *   - fixedHolidays               → "MM-DD" + year
 *   - easterCalculatedHolidays    → Computus + offset
 *   - regionalHolidays.<X>.fixed  → resolved per region, deduped
 *
 * It does NOT resolve (and flags them explicitly):
 *   - customCalculatedHolidays    (ordinal weekdays, UK bank holidays, etc.)
 *   - lunarHolidays               (Hijri / Chinese lunar)
 *   - religiousHolidays           (per-religion filter)
 *
 * Output:
 *   scripts/out/holiday-comparison.md
 *   scripts/out/holiday-comparison.json
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Holidays from "date-holidays";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BEEVAGO_CONFIG_DIR =
  "/Users/michelbonansea/Tech/Projects/beevago-nextjs/src/app/config/holidays";

// Every country with a beevago public_holidays file
const countryCodes = fs
  .readdirSync(BEEVAGO_CONFIG_DIR)
  .filter((name) => {
    const dir = path.join(BEEVAGO_CONFIG_DIR, name);
    if (!fs.statSync(dir).isDirectory()) return false;
    return fs
      .readdirSync(dir)
      .some((f) => f.startsWith(`public_holidays_${name}_`));
  })
  .map((c) => c.toUpperCase())
  .sort();

const currentYear = new Date().getFullYear();
const YEARS = [currentYear, currentYear + 1];

// -- Beevago loader + resolver -----------------------------------------------

function findBeevagoConfigFile(cc) {
  const dir = path.join(BEEVAGO_CONFIG_DIR, cc.toLowerCase());
  if (!fs.existsSync(dir)) return null;
  const matches = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith(`public_holidays_${cc.toLowerCase()}_`))
    .sort();
  if (!matches.length) return null;
  return path.join(dir, matches[matches.length - 1]);
}

/** Anonymous Gregorian algorithm for Easter Sunday */
function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const L = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * L) / 451);
  const month = Math.floor((h + L - 7 * m + 114) / 31);
  const day = ((h + L - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

function iso(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function resolveBeevago(config, year) {
  const resolved = [];
  const unresolved = { custom: 0, lunar: 0, religious: 0 };

  // Fixed holidays: "MM-DD"
  for (const h of config.fixedHolidays ?? []) {
    if (!h.date) continue;
    const [mm, dd] = h.date.split("-");
    resolved.push({
      date: `${year}-${mm}-${dd}`,
      name: h.name,
      source: "fixed",
    });
  }

  // Easter-calculated
  const easter = easterSunday(year);
  for (const h of config.easterCalculatedHolidays ?? []) {
    const offset = h.easterOffset ?? 0;
    const d = new Date(easter);
    d.setUTCDate(d.getUTCDate() + offset);
    resolved.push({
      date: iso(d),
      name: h.name,
      source: "easter",
    });
  }

  // Christmas-calculated (Advent Sundays etc.) — some beevago configs use this
  if (config.christmasCalculatedHolidays) {
    for (const h of config.christmasCalculatedHolidays) {
      // Advent logic: fourth Sunday before Christmas
      const christmas = new Date(Date.UTC(year, 11, 25));
      const christmasDow = christmas.getUTCDay();
      const daysToPrevSunday = christmasDow === 0 ? 7 : christmasDow;
      const adventSundays = [28, 21, 14, 7].map((d) => {
        const x = new Date(christmas);
        x.setUTCDate(x.getUTCDate() - daysToPrevSunday - d + 7);
        return x;
      });
      const offset = h.christmasOffset ?? 0;
      if (offset === 0) {
        resolved.push({ date: iso(christmas), name: h.name, source: "christmas" });
      } else if (offset < 0 && offset >= -4) {
        const idx = Math.abs(offset) - 1;
        if (adventSundays[idx]) {
          resolved.push({
            date: iso(adventSundays[idx]),
            name: h.name,
            source: "advent",
          });
        }
      }
    }
  }

  // Custom calculated (ordinal weekdays, country-specific) — count only
  if (config.customCalculatedHolidays?.length) {
    unresolved.custom = config.customCalculatedHolidays.length;
  }

  // Lunar / Hijri
  if (config.lunarHolidays?.length) unresolved.lunar = config.lunarHolidays.length;
  if (config.hijriHolidays?.length)
    unresolved.lunar += config.hijriHolidays.length;

  // Religious
  if (config.religiousHolidays?.length)
    unresolved.religious = config.religiousHolidays.length;

  // Regional fixed holidays — aggregate unique dates across regions
  if (config.regionalHolidays) {
    for (const region of Object.values(config.regionalHolidays)) {
      for (const h of region.fixedHolidays ?? []) {
        if (!h.date) continue;
        const [mm, dd] = h.date.split("-");
        resolved.push({
          date: `${year}-${mm}-${dd}`,
          name: h.name,
          source: "regional-fixed",
        });
      }
      for (const h of region.easterCalculatedHolidays ?? []) {
        const d = new Date(easter);
        d.setUTCDate(d.getUTCDate() + (h.easterOffset ?? 0));
        resolved.push({ date: iso(d), name: h.name, source: "regional-easter" });
      }
    }
  }

  // Dedup by (date, name)
  const seen = new Set();
  const uniq = [];
  for (const h of resolved) {
    const k = `${h.date}|${h.name}`;
    if (seen.has(k)) continue;
    seen.add(k);
    uniq.push(h);
  }

  return { resolved: uniq.filter((h) => h.date.startsWith(String(year))), unresolved };
}

// -- date-holidays -----------------------------------------------------------

function getLibHolidays(cc, year) {
  const hd = new Holidays();
  try {
    hd.init(cc, { languages: ["en"] });
  } catch {
    return null;
  }
  const list = hd.getHolidays(year);
  if (!list) return null;
  return list
    .filter((h) => h.type !== "observance")
    .map((h) => ({
      date: h.date.slice(0, 10),
      name: h.name,
      type: h.type,
    }));
}

// -- comparison --------------------------------------------------------------

function compare(beevagoList, libList) {
  const bByDate = new Map();
  const lByDate = new Map();
  for (const h of beevagoList) {
    if (!bByDate.has(h.date)) bByDate.set(h.date, []);
    bByDate.get(h.date).push(h);
  }
  for (const h of libList) {
    if (!lByDate.has(h.date)) lByDate.set(h.date, []);
    lByDate.get(h.date).push(h);
  }

  const allDates = new Set([...bByDate.keys(), ...lByDate.keys()]);
  const overlap = [];
  const beevagoOnly = [];
  const libOnly = [];

  for (const date of [...allDates].sort()) {
    const b = bByDate.get(date);
    const l = lByDate.get(date);
    if (b && l) {
      overlap.push({
        date,
        beevago: b.map((x) => x.name).join(" / "),
        lib: l.map((x) => x.name).join(" / "),
      });
    } else if (b) {
      beevagoOnly.push({ date, name: b.map((x) => x.name).join(" / ") });
    } else {
      libOnly.push({
        date,
        name: l.map((x) => x.name).join(" / "),
        type: l.map((x) => x.type).join(" / "),
      });
    }
  }

  return { overlap, beevagoOnly, libOnly };
}

// -- main --------------------------------------------------------------------

const report = {};

for (const cc of countryCodes) {
  report[cc] = {};
  for (const year of YEARS) {
    const file = findBeevagoConfigFile(cc);
    if (!file) {
      report[cc][year] = { error: "no beevago config" };
      continue;
    }
    const config = JSON.parse(fs.readFileSync(file, "utf8"));
    const { resolved, unresolved } = resolveBeevago(config, year);
    const lib = getLibHolidays(cc, year);
    if (lib === null) {
      report[cc][year] = {
        error: "country not supported by date-holidays",
        beevagoCount: resolved.length,
        unresolvedBeevagoRules: unresolved,
      };
      continue;
    }
    const cmp = compare(resolved, lib);

    report[cc][year] = {
      beevagoCount: resolved.length,
      libCount: lib.length,
      overlap: cmp.overlap.length,
      beevagoOnly: cmp.beevagoOnly,
      libOnly: cmp.libOnly,
      unresolvedBeevagoRules: unresolved,
    };
  }
}

// -- output ------------------------------------------------------------------

const outDir = path.join(__dirname, "out");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "holiday-comparison.json"),
  JSON.stringify(report, null, 2),
);

const md = renderMarkdown(report);
fs.writeFileSync(path.join(outDir, "holiday-comparison.md"), md);

// Summary table to stdout
console.log(
  "\nCountry  Year  beevago  lib  overlap  bvOnly  libOnly  unresolved(c/l/r)",
);
console.log("-".repeat(80));
for (const cc of Object.keys(report).sort()) {
  for (const year of Object.keys(report[cc]).sort()) {
    const r = report[cc][year];
    if (r.error) {
      console.log(`${cc.padEnd(8)}${year}  ${r.error}`);
      continue;
    }
    const u = r.unresolvedBeevagoRules;
    console.log(
      `${cc.padEnd(8)}${year}  ${String(r.beevagoCount).padStart(7)}  ${String(r.libCount).padStart(3)}  ${String(r.overlap).padStart(7)}  ${String(r.beevagoOnly.length).padStart(6)}  ${String(r.libOnly.length).padStart(7)}  ${u.custom}/${u.lunar}/${u.religious}`,
    );
  }
}
console.log(
  `\nWrote ${path.relative(ROOT, path.join(outDir, "holiday-comparison.md"))}`,
);
console.log(
  `Wrote ${path.relative(ROOT, path.join(outDir, "holiday-comparison.json"))}`,
);

function renderMarkdown(report) {
  const lines = [
    "# Public holiday comparison: beevago vs `date-holidays`",
    "",
    `_Generated ${new Date().toISOString()}_`,
    "",
    "## Caveat",
    "",
    "This script resolves beevago's JSON rules directly (fixed + Easter +",
    "Christmas-relative + regional fixed/Easter). Custom calculations (ordinal",
    "weekdays like UK bank holidays), lunar/Hijri, and religious-filtered",
    "holidays are **not resolved** — they are counted as unresolved rules at",
    "the end of each country block. That means:",
    "",
    "- For countries dominated by fixed + Easter (EU Catholic/Protestant), the",
    "  comparison is nearly complete.",
    "- For UK (bank holidays), JP (Happy Monday), US (ordinal federal),",
    "  TH/VN/MA (lunar/Hijri), beevago will appear to miss holidays it",
    "  actually covers via rules this script doesn't implement.",
    "",
    "## Summary",
    "",
    "| Country | Year | beevago resolved | lib | overlap | beevago-only | lib-only | unresolved rules (custom/lunar/religious) |",
    "| ------- | ---- | ---------------- | --- | ------- | ------------ | -------- | ----------------------------------------- |",
  ];

  for (const cc of Object.keys(report).sort()) {
    for (const year of Object.keys(report[cc]).sort()) {
      const r = report[cc][year];
      if (r.error) {
        lines.push(`| ${cc} | ${year} | — | — | — | — | — | _${r.error}_ |`);
        continue;
      }
      const u = r.unresolvedBeevagoRules;
      lines.push(
        `| ${cc} | ${year} | ${r.beevagoCount} | ${r.libCount} | ${r.overlap} | ${r.beevagoOnly.length} | ${r.libOnly.length} | ${u.custom}/${u.lunar}/${u.religious} |`,
      );
    }
  }

  lines.push("", "## Per-country detail");

  for (const cc of Object.keys(report).sort()) {
    lines.push(`\n### ${cc}\n`);
    for (const year of Object.keys(report[cc]).sort()) {
      const r = report[cc][year];
      lines.push(`#### ${year}\n`);
      if (r.error) {
        lines.push(`_${r.error}_\n`);
        continue;
      }
      if (r.beevagoOnly.length) {
        lines.push("**Beevago has (resolved), lib does not:**\n");
        for (const h of r.beevagoOnly) {
          lines.push(`- ${h.date} — ${h.name}`);
        }
        lines.push("");
      }
      if (r.libOnly.length) {
        lines.push("**`date-holidays` has, beevago rules don't produce:**\n");
        for (const h of r.libOnly) {
          lines.push(`- ${h.date} — ${h.name} _(type: ${h.type})_`);
        }
        lines.push("");
      }
      if (!r.beevagoOnly.length && !r.libOnly.length) {
        lines.push("✅ Full agreement on resolved rule categories.\n");
      }

      const u = r.unresolvedBeevagoRules;
      if (u.custom || u.lunar || u.religious) {
        lines.push(
          `_Beevago also defines ${u.custom} custom-calculated + ${u.lunar} lunar + ${u.religious} religious rules that this script does not resolve._\n`,
        );
      }
    }
  }

  return lines.join("\n");
}
