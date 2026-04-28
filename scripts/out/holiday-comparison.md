# Public holiday comparison: beevago vs `date-holidays`

_Generated 2026-04-17T15:51:27.746Z_

## Caveat

This script resolves beevago's JSON rules directly (fixed + Easter +
Christmas-relative + regional fixed/Easter). Custom calculations (ordinal
weekdays like UK bank holidays), lunar/Hijri, and religious-filtered
holidays are **not resolved** — they are counted as unresolved rules at
the end of each country block. That means:

- For countries dominated by fixed + Easter (EU Catholic/Protestant), the
  comparison is nearly complete.
- For UK (bank holidays), JP (Happy Monday), US (ordinal federal),
  TH/VN/MA (lunar/Hijri), beevago will appear to miss holidays it
  actually covers via rules this script doesn't implement.

## Summary

| Country | Year | beevago resolved | lib | overlap | beevago-only | lib-only | unresolved rules (custom/lunar/religious) |
| ------- | ---- | ---------------- | --- | ------- | ------------ | -------- | ----------------------------------------- |
| AE | 2026 | 3 | 8 | 2 | 1 | 6 | 0/0/0 |
| AE | 2027 | 3 | 9 | 2 | 1 | 7 | 0/0/0 |
| AM | 2026 | 14 | 12 | 11 | 3 | 1 | 0/0/0 |
| AM | 2027 | 14 | 12 | 11 | 3 | 1 | 0/0/0 |
| AO | 2026 | 13 | 11 | 11 | 2 | 0 | 10/0/0 |
| AO | 2027 | 13 | 11 | 11 | 2 | 0 | 10/0/0 |
| AR | 2026 | 12 | 19 | 12 | 0 | 6 | 4/0/0 |
| AR | 2027 | 12 | 19 | 12 | 0 | 7 | 4/0/0 |
| AT | 2026 | 19 | 17 | 13 | 6 | 4 | 0/0/0 |
| AT | 2027 | 19 | 17 | 13 | 6 | 4 | 0/0/0 |
| AU | 2026 | 9 | 10 | 9 | 0 | 1 | 0/0/0 |
| AU | 2027 | 9 | 11 | 9 | 0 | 2 | 0/0/0 |
| BA | 2026 | 12 | 21 | 5 | 7 | 16 | 0/0/0 |
| BA | 2027 | 12 | 22 | 5 | 7 | 16 | 0/0/0 |
| BE | 2026 | 12 | 10 | 10 | 2 | 0 | 0/0/0 |
| BE | 2027 | 12 | 10 | 10 | 2 | 0 | 0/0/0 |
| BG | 2026 | 15 | 13 | 10 | 5 | 3 | 0/0/0 |
| BG | 2027 | 15 | 13 | 10 | 5 | 3 | 0/0/0 |
| BO | 2026 | 19 | 12 | 9 | 9 | 3 | 0/0/0 |
| BO | 2027 | 19 | 11 | 9 | 9 | 2 | 0/0/0 |
| BR | 2026 | 13 | 16 | 11 | 2 | 5 | 0/0/0 |
| BR | 2027 | 13 | 14 | 11 | 2 | 3 | 0/0/0 |
| CA | 2026 | 9 | 12 | 7 | 2 | 5 | 1/0/0 |
| CA | 2027 | 9 | 12 | 7 | 2 | 5 | 1/0/0 |
| CH | 2026 | 25 | 11 | 8 | 15 | 3 | 0/0/0 |
| CH | 2027 | 25 | 11 | 8 | 16 | 3 | 0/0/0 |
| CL | 2026 | 13 | 17 | 12 | 1 | 5 | 2/0/0 |
| CL | 2027 | 13 | 18 | 12 | 1 | 6 | 2/0/0 |
| CN | 2026 | 0 | 15 | 0 | 0 | 15 | 0/0/0 |
| CN | 2027 | 0 | 15 | 0 | 0 | 15 | 0/0/0 |
| CO | 2026 | 11 | 19 | 11 | 0 | 8 | 7/0/0 |
| CO | 2027 | 11 | 19 | 11 | 0 | 8 | 7/0/0 |
| CR | 2026 | 12 | 11 | 10 | 2 | 1 | 0/0/0 |
| CR | 2027 | 12 | 11 | 11 | 1 | 0 | 0/0/0 |
| CU | 2026 | 10 | 9 | 9 | 1 | 0 | 0/0/0 |
| CU | 2027 | 10 | 9 | 9 | 1 | 0 | 0/0/0 |
| CY | 2026 | 14 | 15 | 10 | 4 | 5 | 0/0/0 |
| CY | 2027 | 14 | 15 | 10 | 4 | 5 | 0/0/0 |
| CZ | 2026 | 13 | 13 | 13 | 0 | 0 | 0/0/0 |
| CZ | 2027 | 13 | 13 | 13 | 0 | 0 | 0/0/0 |
| DE | 2026 | 18 | 11 | 9 | 9 | 2 | 0/0/0 |
| DE | 2027 | 18 | 11 | 9 | 9 | 2 | 0/0/0 |
| DK | 2026 | 10 | 10 | 10 | 0 | 0 | 0/0/0 |
| DK | 2027 | 10 | 10 | 10 | 0 | 0 | 0/0/0 |
| DO | 2026 | 8 | 12 | 8 | 0 | 4 | 4/0/0 |
| DO | 2027 | 8 | 12 | 8 | 0 | 4 | 4/0/0 |
| EC | 2026 | 5 | 12 | 5 | 0 | 7 | 6/0/0 |
| EC | 2027 | 5 | 12 | 5 | 0 | 7 | 6/0/0 |
| EG | 2026 | 8 | 13 | 7 | 1 | 5 | 0/0/0 |
| EG | 2027 | 8 | 13 | 7 | 1 | 5 | 0/0/0 |
| ES | 2026 | 36 | 11 | 10 | 21 | 1 | 1/0/0 |
| ES | 2027 | 36 | 11 | 10 | 21 | 1 | 1/0/0 |
| FI | 2026 | 12 | 16 | 12 | 0 | 4 | 3/0/0 |
| FI | 2027 | 12 | 16 | 12 | 0 | 4 | 3/0/0 |
| FR | 2026 | 16 | 11 | 11 | 5 | 0 | 0/0/0 |
| FR | 2027 | 16 | 11 | 11 | 5 | 0 | 0/0/0 |
| GB | 2026 | 8 | 8 | 5 | 3 | 3 | 2/0/0 |
| GB | 2027 | 8 | 9 | 5 | 3 | 4 | 2/0/0 |
| GR | 2026 | 14 | 14 | 8 | 6 | 6 | 0/0/0 |
| GR | 2027 | 14 | 14 | 8 | 6 | 6 | 0/0/0 |
| GT | 2026 | 11 | 16 | 11 | 0 | 5 | 1/0/0 |
| GT | 2027 | 11 | 16 | 11 | 0 | 5 | 1/0/0 |
| GY | 2026 | 10 | 13 | 10 | 0 | 3 | 8/0/0 |
| GY | 2027 | 10 | 13 | 10 | 0 | 3 | 8/0/0 |
| HK | 2026 | 8 | 17 | 7 | 1 | 10 | 9/0/0 |
| HK | 2027 | 8 | 17 | 7 | 1 | 10 | 9/0/0 |
| HR | 2026 | 14 | 21 | 13 | 1 | 8 | 0/0/0 |
| HR | 2027 | 14 | 21 | 13 | 1 | 8 | 0/0/0 |
| HU | 2026 | 11 | 14 | 11 | 0 | 3 | 0/0/0 |
| HU | 2027 | 11 | 14 | 11 | 0 | 3 | 0/0/0 |
| ID | 2026 | 7 | 16 | 5 | 1 | 11 | 0/0/0 |
| ID | 2027 | 7 | 17 | 5 | 1 | 11 | 0/0/0 |
| IE | 2026 | 5 | 13 | 5 | 0 | 8 | 5/0/0 |
| IE | 2027 | 5 | 13 | 5 | 0 | 8 | 5/0/0 |
| IL | 2026 | 0 | 15 | 0 | 0 | 15 | 0/0/0 |
| IL | 2027 | 0 | 15 | 0 | 0 | 15 | 0/0/0 |
| IN | 2026 | 4 | 6 | 4 | 0 | 2 | 0/0/0 |
| IN | 2027 | 4 | 6 | 4 | 0 | 2 | 0/0/0 |
| IT | 2026 | 12 | 13 | 12 | 0 | 1 | 0/0/0 |
| IT | 2027 | 12 | 13 | 12 | 0 | 1 | 0/0/0 |
| JP | 2026 | 10 | 21 | 10 | 0 | 11 | 4/0/0 |
| JP | 2027 | 10 | 20 | 10 | 0 | 10 | 4/0/0 |
| KH | 2026 | 14 | 0 | 0 | 14 | 0 | 0/0/0 |
| KH | 2027 | 14 | 0 | 0 | 14 | 0 | 0/0/0 |
| KR | 2026 | 3 | 12 | 3 | 0 | 9 | 14/0/0 |
| KR | 2027 | 3 | 12 | 3 | 0 | 9 | 14/0/0 |
| LT | 2026 | 14 | 14 | 14 | 0 | 0 | 2/0/0 |
| LT | 2027 | 14 | 14 | 14 | 0 | 0 | 2/0/0 |
| LU | 2026 | 11 | 11 | 11 | 0 | 0 | 0/0/0 |
| LU | 2027 | 11 | 11 | 11 | 0 | 0 | 0/0/0 |
| MA | 2026 | 11 | 13 | 9 | 2 | 4 | 0/0/0 |
| MA | 2027 | 11 | 13 | 9 | 2 | 3 | 0/0/0 |
| ME | 2026 | 15 | 24 | 13 | 2 | 11 | 0/0/0 |
| ME | 2027 | 15 | 25 | 13 | 2 | 11 | 0/0/0 |
| MK | 2026 | 10 | 32 | 10 | 0 | 22 | 9/0/0 |
| MK | 2027 | 10 | 29 | 10 | 0 | 18 | 9/0/0 |
| MT | 2026 | 14 | 14 | 14 | 0 | 0 | 0/0/0 |
| MT | 2027 | 14 | 14 | 14 | 0 | 0 | 0/0/0 |
| MX | 2026 | 10 | 11 | 8 | 2 | 3 | 3/0/0 |
| MX | 2027 | 10 | 11 | 8 | 2 | 3 | 3/0/0 |
| MY | 2026 | 31 | 17 | 7 | 24 | 10 | 0/0/0 |
| MY | 2027 | 31 | 16 | 5 | 26 | 11 | 0/0/0 |
| NG | 2026 | 8 | 14 | 8 | 0 | 5 | 0/0/0 |
| NG | 2027 | 8 | 16 | 8 | 0 | 8 | 0/0/0 |
| NL | 2026 | 10 | 12 | 10 | 0 | 2 | 1/0/0 |
| NL | 2027 | 10 | 12 | 10 | 0 | 2 | 1/0/0 |
| NO | 2026 | 12 | 15 | 12 | 0 | 3 | 0/0/0 |
| NO | 2027 | 12 | 15 | 11 | 0 | 3 | 0/0/0 |
| NZ | 2026 | 6 | 13 | 6 | 0 | 7 | 5/0/0 |
| NZ | 2027 | 6 | 16 | 6 | 0 | 10 | 5/0/0 |
| OM | 2026 | 2 | 0 | 0 | 2 | 0 | 0/0/0 |
| OM | 2027 | 2 | 0 | 0 | 2 | 0 | 0/0/0 |
| PA | 2026 | 13 | 10 | 10 | 3 | 0 | 0/0/0 |
| PA | 2027 | 13 | 11 | 10 | 3 | 1 | 0/0/0 |
| PE | 2026 | 16 | 13 | 12 | 4 | 1 | 0/0/0 |
| PE | 2027 | 16 | 13 | 12 | 4 | 1 | 0/0/0 |
| PH | 2026 | 17 | 21 | 16 | 1 | 5 | 0/0/0 |
| PH | 2027 | 17 | 21 | 16 | 1 | 5 | 0/0/0 |
| PL | 2026 | 13 | 17 | 13 | 0 | 4 | 0/0/0 |
| PL | 2027 | 13 | 17 | 13 | 0 | 4 | 0/0/0 |
| PT | 2026 | 13 | 13 | 13 | 0 | 0 | 0/0/0 |
| PT | 2027 | 13 | 13 | 13 | 0 | 0 | 0/0/0 |
| PY | 2026 | 9 | 14 | 9 | 0 | 5 | 4/0/0 |
| PY | 2027 | 9 | 14 | 9 | 0 | 5 | 4/0/0 |
| RO | 2026 | 17 | 16 | 11 | 6 | 4 | 0/0/0 |
| RO | 2027 | 17 | 16 | 11 | 6 | 5 | 0/0/0 |
| RS | 2026 | 1 | 18 | 1 | 0 | 17 | 12/0/0 |
| RS | 2027 | 1 | 18 | 1 | 0 | 16 | 12/0/0 |
| SA | 2026 | 2 | 4 | 2 | 0 | 2 | 0/0/0 |
| SA | 2027 | 2 | 4 | 2 | 0 | 2 | 0/0/0 |
| SE | 2026 | 11 | 19 | 11 | 0 | 8 | 2/0/0 |
| SE | 2027 | 11 | 19 | 11 | 0 | 8 | 2/0/0 |
| SG | 2026 | 4 | 14 | 4 | 0 | 10 | 0/0/0 |
| SG | 2027 | 4 | 11 | 4 | 0 | 7 | 0/0/0 |
| SI | 2026 | 15 | 15 | 15 | 0 | 0 | 0/0/0 |
| SI | 2027 | 15 | 15 | 15 | 0 | 0 | 0/0/0 |
| SK | 2026 | 14 | 12 | 11 | 3 | 1 | 0/0/0 |
| SK | 2027 | 14 | 12 | 11 | 3 | 1 | 0/0/0 |
| SR | 2026 | 10 | 16 | 10 | 0 | 6 | 0/0/0 |
| SR | 2027 | 10 | 16 | 10 | 0 | 6 | 0/0/0 |
| TH | 2026 | 15 | 18 | 14 | 1 | 4 | 0/0/0 |
| TH | 2027 | 15 | 14 | 14 | 1 | 0 | 0/0/0 |
| TN | 2026 | 8 | 12 | 7 | 1 | 4 | 0/0/0 |
| TN | 2027 | 8 | 12 | 7 | 1 | 5 | 0/0/0 |
| TR | 2026 | 7 | 9 | 7 | 0 | 2 | 0/0/0 |
| TR | 2027 | 7 | 9 | 7 | 0 | 2 | 0/0/0 |
| TW | 2026 | 1 | 14 | 1 | 0 | 13 | 15/0/0 |
| TW | 2027 | 1 | 17 | 1 | 0 | 15 | 15/0/0 |
| US | 2026 | 18 | 13 | 5 | 13 | 8 | 6/0/0 |
| US | 2027 | 18 | 16 | 5 | 13 | 10 | 6/0/0 |
| UY | 2026 | 15 | 7 | 7 | 8 | 0 | 3/0/0 |
| UY | 2027 | 15 | 7 | 7 | 8 | 0 | 3/0/0 |
| VE | 2026 | 15 | 16 | 14 | 1 | 2 | 0/0/0 |
| VE | 2027 | 15 | 16 | 14 | 1 | 2 | 0/0/0 |
| VN | 2026 | 5 | 7 | 4 | 1 | 3 | 0/0/0 |
| VN | 2027 | 5 | 7 | 4 | 1 | 3 | 0/0/0 |
| ZA | 2026 | 12 | 13 | 12 | 0 | 1 | 10/0/0 |
| ZA | 2027 | 12 | 14 | 12 | 0 | 2 | 10/0/0 |

## Per-country detail

### AE

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-12-03 — National Day (Day 2)

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-16 — Laylat al-Mi'raj _(type: public)_
- 2026-02-18 — First day of Ramadan _(type: public)_
- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2026-06-16 — Islamic New Year _(type: public)_
- 2026-08-25 — Birthday of Muhammad (Mawlid) _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-12-03 — National Day (Day 2)

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-05 — Laylat al-Mi'raj _(type: public)_
- 2027-02-08 — First day of Ramadan _(type: public)_
- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2027-06-06 — Islamic New Year _(type: public)_
- 2027-08-14 — Birthday of Muhammad (Mawlid) _(type: public)_
- 2027-12-25 — Laylat al-Mi'raj _(type: public)_


### AM

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-01-02 — New Year Holiday
- 2026-04-05 — Easter Sunday
- 2026-04-06 — Easter Monday

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-03 — Pre-Christmas holidays _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-01-02 — New Year Holiday
- 2027-03-28 — Easter Sunday
- 2027-03-29 — Easter Monday

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-03 — Pre-Christmas holidays _(type: public)_


### AO

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-02-16 — Carnival Monday
- 2026-03-23 — Southern Africa Liberation Day

_Beevago also defines 10 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-02-08 — Carnival Monday
- 2027-03-23 — Southern Africa Liberation Day

_Beevago also defines 10 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### AR

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-06-15 — Anniversary of the Passing to Immortality of General Martín Miguel de Güemes _(type: public)_
- 2026-08-17 — Anniversary of the Passing to Immortality of General José de San Martín _(type: public)_
- 2026-10-12 — Day of Respect for Cultural Diversity _(type: public)_
- 2026-11-23 — Day of National Sovereignty _(type: public)_
- 2026-12-24 — Christmas Eve _(type: optional)_
- 2026-12-31 — New Year's Eve _(type: optional)_

_Beevago also defines 4 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-25 — Maundy Thursday _(type: bank)_
- 2027-06-21 — Anniversary of the Passing to Immortality of General Martín Miguel de Güemes _(type: public)_
- 2027-08-16 — Anniversary of the Passing to Immortality of General José de San Martín _(type: public)_
- 2027-10-11 — Day of Respect for Cultural Diversity _(type: public)_
- 2027-11-20 — Day of National Sovereignty _(type: public)_
- 2027-12-24 — Christmas Eve _(type: optional)_
- 2027-12-31 — New Year's Eve _(type: optional)_

_Beevago also defines 4 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### AT

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-03-19 — Saint Joseph's Day
- 2026-05-04 — Saint Florian's Day
- 2026-09-24 — Saint Rupert's Day
- 2026-10-10 — Plebiscite Day
- 2026-11-11 — Saint Martin's Day
- 2026-11-15 — Saint Leopold's Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-05 — Easter Sunday _(type: public)_
- 2026-05-24 — Pentecost _(type: public)_
- 2026-12-24 — Christmas Eve _(type: bank)_
- 2026-12-31 — New Year's Eve _(type: bank)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-03-19 — Saint Joseph's Day
- 2027-05-04 — Saint Florian's Day
- 2027-09-24 — Saint Rupert's Day
- 2027-10-10 — Plebiscite Day
- 2027-11-11 — Saint Martin's Day
- 2027-11-15 — Saint Leopold's Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-28 — Easter Sunday _(type: public)_
- 2027-05-16 — Pentecost _(type: public)_
- 2027-12-24 — Christmas Eve _(type: bank)_
- 2027-12-31 — New Year's Eve _(type: bank)_


### AU

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-12-28 — Boxing Day (substitute day) _(type: public)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-12-27 — Christmas Day (substitute day) _(type: public)_
- 2027-12-28 — Boxing Day (substitute day) _(type: public)_


### BA

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-01-09 — Republic Day
- 2026-03-01 — Independence Day
- 2026-03-08 — Brčko District Establishment Day
- 2026-05-09 — Victory Day
- 2026-06-28 — St. Vitus Day
- 2026-11-21 — Dayton Agreement Day
- 2026-11-25 — Statehood Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-06 — Epiphany _(type: public)_
- 2026-01-07 — Orthodox Christmas _(type: public)_
- 2026-01-14 — Orthodox New Year _(type: public)_
- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-04-05 — Easter Sunday _(type: public)_
- 2026-04-06 — Easter Monday _(type: public)_
- 2026-04-12 — Orthodox Easter _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2026-06-04 — Corpus Christi _(type: public)_
- 2026-06-16 — Islamic New Year _(type: public)_
- 2026-08-15 — Assumption _(type: public)_
- 2026-08-25 — Birthday of Muhammad (Mawlid) _(type: public)_
- 2026-08-28 — Assumption _(type: public)_
- 2026-11-02 — All Souls' Day _(type: public)_
- 2026-12-25 — Christmas Day _(type: public)_
- 2026-12-26 — Boxing Day _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-01-09 — Republic Day
- 2027-03-01 — Independence Day
- 2027-03-08 — Brčko District Establishment Day
- 2027-05-09 — Victory Day
- 2027-06-28 — St. Vitus Day
- 2027-11-21 — Dayton Agreement Day
- 2027-11-25 — Statehood Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-06 — Epiphany _(type: public)_
- 2027-01-07 — Orthodox Christmas _(type: public)_
- 2027-01-14 — Orthodox New Year _(type: public)_
- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-03-28 — Easter Sunday _(type: public)_
- 2027-03-29 — Easter Monday _(type: public)_
- 2027-05-03 — 2nd day of the Labour Day (substitute day) _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2027-05-27 — Corpus Christi _(type: public)_
- 2027-06-06 — Islamic New Year _(type: public)_
- 2027-08-14 — Birthday of Muhammad (Mawlid) _(type: public)_
- 2027-08-15 — Assumption _(type: public)_
- 2027-08-28 — Assumption _(type: public)_
- 2027-11-02 — All Souls' Day _(type: public)_
- 2027-12-25 — Christmas Day _(type: public)_
- 2027-12-26 — Boxing Day _(type: public)_


### BE

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-04-05 — Easter Sunday
- 2026-05-24 — Whit Sunday

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-03-28 — Easter Sunday
- 2027-05-16 — Whit Sunday


### BG

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-04-03 — Orthodox Good Friday
- 2026-04-04 — Orthodox Holy Saturday
- 2026-04-05 — Orthodox Easter Sunday
- 2026-04-06 — Orthodox Easter Monday
- 2026-12-26 — Second Day of Christmas

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-10 — Good Friday _(type: public)_
- 2026-04-12 — Easter Sunday _(type: public)_
- 2026-04-13 — Easter Monday _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-03-26 — Orthodox Good Friday
- 2027-03-27 — Orthodox Holy Saturday
- 2027-03-28 — Orthodox Easter Sunday
- 2027-03-29 — Orthodox Easter Monday
- 2027-12-26 — Second Day of Christmas

**`date-holidays` has, beevago rules don't produce:**

- 2027-04-30 — Good Friday _(type: public)_
- 2027-05-02 — Easter Sunday _(type: public)_
- 2027-05-03 — Easter Monday _(type: public)_


### BO

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-02-10 — Oruro Civic Day
- 2026-04-15 — Tarija Civic Day
- 2026-05-25 — Chuquisaca Civic Day
- 2026-07-16 — La Paz Civic Day
- 2026-08-02 — Agrarian Reform Day
- 2026-09-14 — Cochabamba Civic Day
- 2026-09-24 — Santa Cruz Civic Day / Pando Civic Day
- 2026-11-10 — Potosi Civic Day
- 2026-11-18 — Beni Civic Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-22 — Plurinational State Foundation Day _(type: public)_
- 2026-06-21 — Andean Amazonian Chaqueño New Year _(type: public)_
- 2026-06-22 — Andean Amazonic Chacoan New Year (substitutes) _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-02-10 — Oruro Civic Day
- 2027-04-15 — Tarija Civic Day
- 2027-05-25 — Chuquisaca Civic Day
- 2027-07-16 — La Paz Civic Day
- 2027-08-02 — Agrarian Reform Day
- 2027-09-14 — Cochabamba Civic Day
- 2027-09-24 — Santa Cruz Civic Day / Pando Civic Day
- 2027-11-10 — Potosi Civic Day
- 2027-11-18 — Beni Civic Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-22 — Plurinational State Foundation Day _(type: public)_
- 2027-06-21 — Andean Amazonian Chaqueño New Year _(type: public)_


### BR

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-02-16 — Carnival Monday
- 2026-02-17 — Carnival Tuesday

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-14 — Carnival _(type: optional)_
- 2026-10-04 — Election Day _(type: public)_
- 2026-10-25 — Election Day _(type: public)_
- 2026-12-24 — Christmas Eve _(type: optional)_
- 2026-12-31 — New Year's Eve _(type: optional)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-02-08 — Carnival Monday
- 2027-02-09 — Carnival Tuesday

**`date-holidays` has, beevago rules don't produce:**

- 2027-02-06 — Carnival _(type: optional)_
- 2027-12-24 — Christmas Eve _(type: optional)_
- 2027-12-31 — New Year's Eve _(type: optional)_


### CA

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-04-06 — Easter Monday
- 2026-06-21 — National Indigenous Peoples Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-05 — Easter Sunday _(type: public)_
- 2026-05-18 — Victoria Day _(type: public)_
- 2026-08-03 — Civic Holiday _(type: public)_
- 2026-09-07 — Labour Day _(type: public)_
- 2026-10-12 — Thanksgiving _(type: public)_

_Beevago also defines 1 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-03-29 — Easter Monday
- 2027-06-21 — National Indigenous Peoples Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-28 — Easter Sunday _(type: public)_
- 2027-05-24 — Victoria Day _(type: public)_
- 2027-08-02 — Civic Holiday _(type: public)_
- 2027-09-06 — Labour Day _(type: public)_
- 2027-10-11 — Thanksgiving _(type: public)_

_Beevago also defines 1 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### CH

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-01-02 — Berchtold's Day
- 2026-01-06 — Epiphany
- 2026-03-01 — Republic Day
- 2026-03-19 — St Joseph's Day
- 2026-05-01 — Labour Day
- 2026-06-04 — Corpus Christi
- 2026-06-23 — Independence of Jura
- 2026-06-29 — St Peter and St Paul
- 2026-08-15 — Assumption Day
- 2026-09-22 — Day after the Federal Fast
- 2026-09-25 — Brother Klaus Festival
- 2026-11-01 — All Saints' Day
- 2026-12-08 — Immaculate Conception
- 2026-12-24 — Christmas Eve
- 2026-12-31 — Restoration Day / New Year's Eve

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-05 — Easter Sunday _(type: public)_
- 2026-05-24 — Pentecost _(type: public)_
- 2026-09-20 — Federal Day of Thanksgiving, Repentance and Prayer _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-01-02 — Berchtold's Day
- 2027-01-06 — Epiphany
- 2027-03-01 — Republic Day
- 2027-03-19 — St Joseph's Day
- 2027-04-03 — Näfelser Fahrt
- 2027-05-01 — Labour Day
- 2027-05-27 — Corpus Christi
- 2027-06-23 — Independence of Jura
- 2027-06-29 — St Peter and St Paul
- 2027-08-15 — Assumption Day
- 2027-09-22 — Day after the Federal Fast
- 2027-09-25 — Brother Klaus Festival
- 2027-11-01 — All Saints' Day
- 2027-12-08 — Immaculate Conception
- 2027-12-24 — Christmas Eve
- 2027-12-31 — Restoration Day / New Year's Eve

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-28 — Easter Sunday _(type: public)_
- 2027-05-16 — Pentecost _(type: public)_
- 2027-09-19 — Federal Day of Thanksgiving, Repentance and Prayer _(type: public)_


### CL

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-04-04 — Holy Saturday

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-05 — Easter Sunday _(type: public)_
- 2026-06-21 — Indigenous People's Day _(type: public)_
- 2026-06-29 — Saints Peter and Paul _(type: public)_
- 2026-10-12 — Columbus Day _(type: public)_
- 2026-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 2 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-03-27 — Holy Saturday

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-28 — Easter Sunday _(type: public)_
- 2027-06-21 — Indigenous People's Day _(type: public)_
- 2027-06-28 — Saints Peter and Paul _(type: public)_
- 2027-09-17 — National holiday _(type: public)_
- 2027-10-11 — Columbus Day _(type: public)_
- 2027-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 2 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### CN

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-01 — New Year's Day _(type: public)_
- 2026-02-16 — Spring Festival _(type: public)_
- 2026-02-17 — Spring Festival _(type: public)_
- 2026-02-18 — Spring Festival _(type: public)_
- 2026-03-08 — International Women's Day _(type: public)_
- 2026-04-05 — Qingming Festival _(type: public)_
- 2026-05-01 — Labour Day _(type: public)_
- 2026-05-04 — Youth Day _(type: public)_
- 2026-06-01 — Children's Day _(type: public)_
- 2026-06-19 — Dragon Boat Festival _(type: public)_
- 2026-08-01 — Army Day _(type: public)_
- 2026-09-25 — Mid-Autumn Festival _(type: public)_
- 2026-10-01 — National Day _(type: public)_
- 2026-10-02 — National Day _(type: public)_
- 2026-10-03 — National Day _(type: public)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-01 — New Year's Day _(type: public)_
- 2027-02-05 — Spring Festival _(type: public)_
- 2027-02-06 — Spring Festival _(type: public)_
- 2027-02-07 — Spring Festival _(type: public)_
- 2027-03-08 — International Women's Day _(type: public)_
- 2027-04-05 — Qingming Festival _(type: public)_
- 2027-05-01 — Labour Day _(type: public)_
- 2027-05-04 — Youth Day _(type: public)_
- 2027-06-01 — Children's Day _(type: public)_
- 2027-06-09 — Dragon Boat Festival _(type: public)_
- 2027-08-01 — Army Day _(type: public)_
- 2027-09-15 — Mid-Autumn Festival _(type: public)_
- 2027-10-01 — National Day _(type: public)_
- 2027-10-02 — National Day _(type: public)_
- 2027-10-03 — National Day _(type: public)_


### CO

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-12 — Epiphany _(type: public)_
- 2026-03-23 — Saint Joseph _(type: public)_
- 2026-04-05 — Easter Sunday _(type: public)_
- 2026-06-29 — Saints Peter and Paul _(type: public)_
- 2026-08-17 — Assumption _(type: public)_
- 2026-10-12 — Columbus Day _(type: public)_
- 2026-11-02 — All Saints' Day _(type: public)_
- 2026-11-16 — Independence of Cartagena _(type: public)_

_Beevago also defines 7 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-11 — Epiphany _(type: public)_
- 2027-03-22 — Saint Joseph _(type: public)_
- 2027-03-28 — Easter Sunday _(type: public)_
- 2027-07-05 — Saints Peter and Paul _(type: public)_
- 2027-08-16 — Assumption _(type: public)_
- 2027-10-18 — Columbus Day _(type: public)_
- 2027-11-01 — All Saints' Day _(type: public)_
- 2027-11-15 — Independence of Cartagena _(type: public)_

_Beevago also defines 7 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### CR

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-10-12 — Día de las Culturas
- 2026-12-01 — Army Abolition Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-10-09 — Columbus Day _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-12-01 — Army Abolition Day


### CU

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-12-31 — New Year's Eve

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-12-31 — New Year's Eve


### CY

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-02-16 — Green Monday
- 2026-04-03 — Orthodox Good Friday
- 2026-04-06 — Orthodox Easter Monday
- 2026-05-25 — Kataklysmos

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-24 — Clean Monday _(type: public)_
- 2026-04-10 — Good Friday _(type: public)_
- 2026-04-12 — Easter Sunday _(type: public)_
- 2026-04-13 — Easter Monday _(type: public)_
- 2026-05-31 — Pentecost _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-02-08 — Green Monday
- 2027-03-26 — Orthodox Good Friday
- 2027-03-29 — Orthodox Easter Monday
- 2027-05-17 — Kataklysmos

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-16 — Clean Monday _(type: public)_
- 2027-04-30 — Good Friday _(type: public)_
- 2027-05-02 — Easter Sunday _(type: public)_
- 2027-05-03 — Easter Monday _(type: public)_
- 2027-06-20 — Pentecost _(type: public)_


### CZ

#### 2026

✅ Full agreement on resolved rule categories.

#### 2027

✅ Full agreement on resolved rule categories.


### DE

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-01-06 — Epiphany
- 2026-03-08 — International Women's Day
- 2026-04-05 — Easter
- 2026-05-24 — Whit Sunday
- 2026-06-04 — Corpus Christi
- 2026-08-15 — Assumption of Mary
- 2026-09-20 — Children's Day
- 2026-10-31 — Reformation Day
- 2026-11-01 — All Saints' Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-12-24 — Christmas Eve _(type: bank)_
- 2026-12-31 — New Year's Eve _(type: bank)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-01-06 — Epiphany
- 2027-03-08 — International Women's Day
- 2027-03-28 — Easter
- 2027-05-16 — Whit Sunday
- 2027-05-27 — Corpus Christi
- 2027-08-15 — Assumption of Mary
- 2027-09-20 — Children's Day
- 2027-10-31 — Reformation Day
- 2027-11-01 — All Saints' Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-12-24 — Christmas Eve _(type: bank)_
- 2027-12-31 — New Year's Eve _(type: bank)_


### DK

#### 2026

✅ Full agreement on resolved rule categories.

#### 2027

✅ Full agreement on resolved rule categories.


### DO

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-05 — Epiphany _(type: public)_
- 2026-01-26 — Duarte's Birthday _(type: public)_
- 2026-05-04 — Labour Day _(type: public)_
- 2026-11-09 — Constitution Day _(type: public)_

_Beevago also defines 4 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-04 — Epiphany _(type: public)_
- 2027-01-25 — Duarte's Birthday _(type: public)_
- 2027-05-01 — Labour Day _(type: public)_
- 2027-11-08 — Constitution Day _(type: public)_

_Beevago also defines 4 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### EC

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-02 — Maundy Thursday _(type: public)_
- 2026-05-01 — Labour Day _(type: public)_
- 2026-05-24 — The Battle of Pichincha _(type: public)_
- 2026-08-10 — Declaration of Independence of Quito _(type: public)_
- 2026-09-10 — Independence of Guayaquil _(type: public)_
- 2026-11-02 — All Souls' Day _(type: public)_
- 2026-11-03 — Independence of Cuenca _(type: public)_

_Beevago also defines 6 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-25 — Maundy Thursday _(type: public)_
- 2027-05-01 — Labour Day _(type: public)_
- 2027-05-24 — The Battle of Pichincha _(type: public)_
- 2027-08-10 — Declaration of Independence of Quito _(type: public)_
- 2027-09-10 — Independence of Guayaquil _(type: public)_
- 2027-11-02 — All Souls' Day _(type: public)_
- 2027-11-03 — Independence of Cuenca _(type: public)_

_Beevago also defines 6 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### EG

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-04-06 — Spring Festival

**`date-holidays` has, beevago rules don't produce:**

- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-04-13 — Sham El Nessim _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2026-06-16 — Islamic New Year _(type: public)_
- 2026-08-25 — Birthday of Muhammad (Mawlid) _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-03-29 — Spring Festival

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-05-03 — Sham El Nessim _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2027-06-06 — Islamic New Year _(type: public)_
- 2027-08-14 — Birthday of Muhammad (Mawlid) _(type: public)_


### ES

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-02-28 — Andalusia Day
- 2026-03-01 — Balearic Islands Day
- 2026-03-19 — St. Joseph's Day
- 2026-04-06 — Easter Monday
- 2026-04-23 — St. George's Day / Aragon Day / Day of Castile and León
- 2026-05-02 — Community of Madrid Day
- 2026-05-17 — Galician Literature Day
- 2026-05-30 — Canary Islands Day
- 2026-05-31 — Castile-La Mancha Day
- 2026-06-04 — Corpus Christi
- 2026-06-09 — La Rioja Day / Murcia Region Day
- 2026-06-24 — St. John's Day
- 2026-07-25 — St. James the Apostle / St. James the Apostle Day / St. James Day (Galicia)
- 2026-07-28 — Day of Cantabrian Institutions
- 2026-08-05 — Our Lady of Africa
- 2026-09-08 — Day of Asturias / Extremadura Day
- 2026-09-11 — Catalonia Day
- 2026-09-15 — La Bien Aparecida
- 2026-10-09 — Valencian Community Day
- 2026-12-03 — St. Francis Xavier Day
- 2026-12-26 — St. Stephen's Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-10-12 — Fiesta Nacional de España _(type: public)_

_Beevago also defines 1 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-02-28 — Andalusia Day
- 2027-03-01 — Balearic Islands Day
- 2027-03-19 — St. Joseph's Day
- 2027-03-29 — Easter Monday
- 2027-04-23 — St. George's Day / Aragon Day / Day of Castile and León
- 2027-05-02 — Community of Madrid Day
- 2027-05-17 — Galician Literature Day
- 2027-05-27 — Corpus Christi
- 2027-05-30 — Canary Islands Day
- 2027-05-31 — Castile-La Mancha Day
- 2027-06-09 — La Rioja Day / Murcia Region Day
- 2027-06-24 — St. John's Day
- 2027-07-25 — St. James the Apostle / St. James the Apostle Day / St. James Day (Galicia)
- 2027-07-28 — Day of Cantabrian Institutions
- 2027-08-05 — Our Lady of Africa
- 2027-09-08 — Day of Asturias / Extremadura Day
- 2027-09-11 — Catalonia Day
- 2027-09-15 — La Bien Aparecida
- 2027-10-09 — Valencian Community Day
- 2027-12-03 — St. Francis Xavier Day
- 2027-12-26 — St. Stephen's Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-10-12 — Fiesta Nacional de España _(type: public)_

_Beevago also defines 1 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### FI

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-06-19 — Midsummer Eve _(type: bank)_
- 2026-06-20 — Midsummer Day _(type: public)_
- 2026-10-31 — All Saints' Day _(type: public)_
- 2026-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 3 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-06-25 — Midsummer Eve _(type: bank)_
- 2027-06-26 — Midsummer Day _(type: public)_
- 2027-11-06 — All Saints' Day _(type: public)_
- 2027-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 3 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### FR

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-04-05 — Easter
- 2026-05-22 — Abolition of Slavery
- 2026-05-24 — Whit Sunday
- 2026-05-27 — Abolition of Slavery
- 2026-12-20 — Abolition of Slavery

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-03-28 — Easter
- 2027-05-16 — Whit Sunday
- 2027-05-22 — Abolition of Slavery
- 2027-05-27 — Abolition of Slavery
- 2027-12-20 — Abolition of Slavery


### GB

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-01-02 — New Year Holiday
- 2026-03-17 — Saint Patrick's Day
- 2026-04-05 — Easter

**`date-holidays` has, beevago rules don't produce:**

- 2026-05-04 — Early May bank holiday _(type: public)_
- 2026-05-25 — Spring bank holiday _(type: public)_
- 2026-12-28 — Boxing Day (substitute day) _(type: public)_

_Beevago also defines 2 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-01-02 — New Year Holiday
- 2027-03-17 — Saint Patrick's Day
- 2027-03-28 — Easter

**`date-holidays` has, beevago rules don't produce:**

- 2027-05-03 — Early May bank holiday _(type: public)_
- 2027-05-31 — Spring bank holiday _(type: public)_
- 2027-12-27 — Christmas Day (substitute day) _(type: public)_
- 2027-12-28 — Boxing Day (substitute day) _(type: public)_

_Beevago also defines 2 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### GR

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-02-16 — Orthodox Ash Monday
- 2026-04-03 — Orthodox Good Friday
- 2026-04-05 — Orthodox Easter Sunday
- 2026-04-06 — Orthodox Easter Monday
- 2026-05-24 — Orthodox Whit Sunday
- 2026-05-25 — Orthodox Whit Monday

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-23 — Ash Sunday _(type: public)_
- 2026-04-10 — Good Friday _(type: public)_
- 2026-04-12 — Easter Sunday _(type: public)_
- 2026-04-13 — Easter Monday _(type: public)_
- 2026-05-31 — Pentecost _(type: public)_
- 2026-06-01 — Whit Monday _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-02-08 — Orthodox Ash Monday
- 2027-03-26 — Orthodox Good Friday
- 2027-03-28 — Orthodox Easter Sunday
- 2027-03-29 — Orthodox Easter Monday
- 2027-05-16 — Orthodox Whit Sunday
- 2027-05-17 — Orthodox Whit Monday

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-15 — Ash Sunday _(type: public)_
- 2027-04-30 — Good Friday _(type: public)_
- 2027-05-02 — Easter Sunday _(type: public)_
- 2027-05-03 — Easter Monday _(type: public)_
- 2027-06-20 — Pentecost _(type: public)_
- 2027-06-21 — Whit Monday _(type: public)_


### GT

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-05-10 — Mother's Day _(type: optional)_
- 2026-06-17 — Father's Day _(type: optional)_
- 2026-06-29 — Army Day _(type: public)_
- 2026-07-01 — Bank Employee Day _(type: bank)_
- 2026-10-12 — Day of Race _(type: bank)_

_Beevago also defines 1 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-05-10 — Mother's Day _(type: optional)_
- 2027-06-17 — Father's Day _(type: optional)_
- 2027-07-01 — Bank Employee Day _(type: bank)_
- 2027-07-02 — Army Day _(type: public)_
- 2027-10-12 — Day of Race _(type: bank)_

_Beevago also defines 1 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### GY

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-05-27 — Eid Ul Adha _(type: public)_
- 2026-07-06 — CARICOM Day _(type: public)_
- 2026-08-25 — Youman Nabi _(type: public)_

_Beevago also defines 8 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-05-16 — Eid Ul Adha _(type: public)_
- 2027-07-05 — CARICOM Day _(type: public)_
- 2027-08-14 — Youman Nabi _(type: public)_

_Beevago also defines 8 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### HK

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-04-05 — Easter

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-17 — Lunar New Year’s Day _(type: public)_
- 2026-02-18 — The second day of Lunar New Year _(type: public)_
- 2026-02-19 — The third day of Lunar New Year _(type: public)_
- 2026-04-07 — The day following Easter Monday _(type: public)_
- 2026-05-25 — The day following Birthday of the Buddha _(type: public)_
- 2026-06-19 — Tuen Ng Festival _(type: public)_
- 2026-09-26 — The day following the Chinese Mid-Autumn Festival _(type: public)_
- 2026-10-19 — The day following Chung Yeung Festival _(type: public)_
- 2026-12-25 — Christmas Day _(type: public)_
- 2026-12-26 — The first weekday after Christmas Day _(type: public)_

_Beevago also defines 9 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-03-28 — Easter

**`date-holidays` has, beevago rules don't produce:**

- 2027-02-06 — Lunar New Year’s Day _(type: public)_
- 2027-02-08 — The third day of Lunar New Year _(type: public)_
- 2027-02-09 — The fourth day of Lunar New Year _(type: public)_
- 2027-04-05 — Ching Ming Festival _(type: public)_
- 2027-05-13 — Birthday of the Buddha _(type: public)_
- 2027-06-09 — Tuen Ng Festival _(type: public)_
- 2027-09-16 — The day following the Chinese Mid-Autumn Festival _(type: public)_
- 2027-10-08 — Chung Yeung Festival _(type: public)_
- 2027-12-25 — Christmas Day _(type: public)_
- 2027-12-27 — The first weekday after Christmas Day _(type: public)_

_Beevago also defines 9 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### HR

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-10-08 — Independence Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-07 — Orthodox Christmas _(type: optional)_
- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: optional)_
- 2026-04-12 — Orthodox Easter _(type: optional)_
- 2026-04-13 — Orthodox Easter Monday _(type: optional)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: optional)_
- 2026-09-12 — Yom Kippur _(type: optional)_
- 2026-09-21 — Yom Kippur _(type: optional)_
- 2026-11-18 — Remembrance Day _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-10-08 — Independence Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-07 — Orthodox Christmas _(type: optional)_
- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: optional)_
- 2027-05-02 — Orthodox Easter _(type: optional)_
- 2027-05-03 — Orthodox Easter Monday _(type: optional)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: optional)_
- 2027-10-02 — Yom Kippur _(type: optional)_
- 2027-10-11 — Yom Kippur _(type: optional)_
- 2027-11-18 — Remembrance Day _(type: public)_


### HU

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-05 — Easter Sunday _(type: public)_
- 2026-05-24 — Pentecost _(type: public)_
- 2026-12-24 — Christmas Eve _(type: optional)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-28 — Easter Sunday _(type: public)_
- 2027-05-16 — Pentecost _(type: public)_
- 2027-12-24 — Christmas Eve _(type: optional)_


### ID

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-04-05 — Good Friday / Ascension Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-16 — Laylat al-Mi'raj _(type: public)_
- 2026-02-17 — Chinese New Year _(type: public)_
- 2026-03-19 — Nyepi _(type: public)_
- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-03-21 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-04-03 — Good Friday _(type: public)_
- 2026-05-14 — Ascension Day _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2026-05-31 — Vesak Day _(type: public)_
- 2026-06-16 — Islamic New Year _(type: public)_
- 2026-08-25 — Birthday of Muhammad (Mawlid) _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-03-28 — Good Friday / Ascension Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-05 — Laylat al-Mi'raj _(type: public)_
- 2027-02-06 — Chinese New Year _(type: public)_
- 2027-03-08 — Nyepi _(type: public)_
- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-03-10 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-03-26 — Good Friday _(type: public)_
- 2027-05-06 — Ascension Day _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2027-05-20 — Vesak Day _(type: public)_
- 2027-06-06 — Islamic New Year _(type: public)_
- 2027-08-14 — Birthday of Muhammad (Mawlid) _(type: public)_


### IE

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-02 — St. Brigid’s Day _(type: public)_
- 2026-04-03 — Good Friday _(type: bank)_
- 2026-04-05 — Easter Sunday _(type: public)_
- 2026-05-04 — May Day _(type: public)_
- 2026-06-01 — First Monday in June _(type: public)_
- 2026-08-03 — First Monday in August _(type: public)_
- 2026-10-26 — October Bank Holiday _(type: public)_
- 2026-12-28 — St. Stephen's Day (substitute day) _(type: bank)_

_Beevago also defines 5 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-02-01 — St. Brigid’s Day _(type: public)_
- 2027-03-26 — Good Friday _(type: bank)_
- 2027-03-28 — Easter Sunday _(type: public)_
- 2027-05-03 — May Day _(type: public)_
- 2027-06-07 — First Monday in June _(type: public)_
- 2027-08-02 — First Monday in August _(type: public)_
- 2027-10-25 — October Bank Holiday _(type: public)_
- 2027-12-27 — St. Stephen's Day (substitute day) _(type: bank)_

_Beevago also defines 5 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### IL

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-03-02 — Fast of Esther _(type: school)_
- 2026-03-03 — Purim _(type: school)_
- 2026-04-02 — Passover (Pesach) _(type: public)_
- 2026-04-03 — Passover (intermediate days) _(type: school)_
- 2026-04-08 — Mimouna, Seventh day of Passover _(type: public)_
- 2026-04-22 — Independence Day (Yom HaAtzmaut) _(type: public)_
- 2026-05-05 — Lag BaOmer _(type: school)_
- 2026-05-22 — Shavuot (Feast of Weeks) _(type: public)_
- 2026-09-12 — Rosh Hashanah (Yom Teruah) _(type: public)_
- 2026-09-13 — Rosh Hashanah (Day 2) _(type: public)_
- 2026-09-21 — Day of Atonement (Yom Kippur) _(type: public)_
- 2026-09-26 — Feast of Tabernacles (Sukkot) _(type: public)_
- 2026-09-27 — The week of Sukkot _(type: school)_
- 2026-10-03 — Simchat Torah/ Shmini Atzeret _(type: public)_
- 2026-12-05 — Hanukkah _(type: school)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-22 — Fast of Esther _(type: school)_
- 2027-03-23 — Purim _(type: school)_
- 2027-04-22 — Passover (Pesach) _(type: public)_
- 2027-04-23 — Passover (intermediate days) _(type: school)_
- 2027-04-28 — Mimouna, Seventh day of Passover _(type: public)_
- 2027-05-12 — Independence Day (Yom HaAtzmaut) _(type: public)_
- 2027-05-25 — Lag BaOmer _(type: school)_
- 2027-06-11 — Shavuot (Feast of Weeks) _(type: public)_
- 2027-10-02 — Rosh Hashanah (Yom Teruah) _(type: public)_
- 2027-10-03 — Rosh Hashanah (Day 2) _(type: public)_
- 2027-10-11 — Day of Atonement (Yom Kippur) _(type: public)_
- 2027-10-16 — Feast of Tabernacles (Sukkot) _(type: public)_
- 2027-10-17 — The week of Sukkot _(type: school)_
- 2027-10-23 — Simchat Torah/ Shmini Atzeret _(type: public)_
- 2027-12-25 — Hanukkah _(type: school)_


### IN

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-03 — Good Friday _(type: public)_
- 2026-04-14 — Ambedkar Jayanti _(type: public)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-26 — Good Friday _(type: public)_
- 2027-04-14 — Ambedkar Jayanti _(type: public)_


### IT

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-10-04 — Francis of Assisi _(type: public)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-10-04 — Francis of Assisi _(type: public)_


### JP

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-02 — January 2nd _(type: bank)_
- 2026-01-03 — January 3rd _(type: bank)_
- 2026-01-12 — Coming of Age Day _(type: public)_
- 2026-03-20 — Spring Equinox Day _(type: public)_
- 2026-05-06 — Constitution Day (substitute day) _(type: public)_
- 2026-07-20 — Marine Day _(type: public)_
- 2026-09-21 — Respect-for-the-Aged Day _(type: public)_
- 2026-09-22 — Citizens' Holiday _(type: public)_
- 2026-09-23 — Autumnal Equinox Day _(type: public)_
- 2026-10-12 — Sports Day _(type: public)_
- 2026-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 4 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-02 — January 2nd _(type: bank)_
- 2027-01-03 — January 3rd _(type: bank)_
- 2027-01-11 — Coming of Age Day _(type: public)_
- 2027-03-21 — Spring Equinox Day _(type: public)_
- 2027-03-22 — Spring Equinox Day (substitute day) _(type: public)_
- 2027-07-19 — Marine Day _(type: public)_
- 2027-09-20 — Respect-for-the-Aged Day _(type: public)_
- 2027-09-23 — Autumnal Equinox Day _(type: public)_
- 2027-10-11 — Sports Day _(type: public)_
- 2027-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 4 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### KH

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-01-01 — New Year's Day
- 2026-01-07 — Victory Over Genocide Day
- 2026-03-08 — International Women's Day
- 2026-04-14 — Khmer New Year (Day 1)
- 2026-04-15 — Khmer New Year (Day 2)
- 2026-04-16 — Khmer New Year (Day 3)
- 2026-05-01 — International Labour Day
- 2026-05-14 — King's Birthday
- 2026-06-18 — Queen Mother's Birthday
- 2026-09-24 — Constitution Day
- 2026-10-15 — King Father Commemoration Day
- 2026-10-29 — Coronation Day
- 2026-11-09 — Independence Day
- 2026-12-29 — Peace Day

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-01-01 — New Year's Day
- 2027-01-07 — Victory Over Genocide Day
- 2027-03-08 — International Women's Day
- 2027-04-14 — Khmer New Year (Day 1)
- 2027-04-15 — Khmer New Year (Day 2)
- 2027-04-16 — Khmer New Year (Day 3)
- 2027-05-01 — International Labour Day
- 2027-05-14 — King's Birthday
- 2027-06-18 — Queen Mother's Birthday
- 2027-09-24 — Constitution Day
- 2027-10-15 — King Father Commemoration Day
- 2027-10-29 — Coronation Day
- 2027-11-09 — Independence Day
- 2027-12-29 — Peace Day


### KR

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-17 — Korean New Year _(type: public)_
- 2026-03-01 — Independence Movement Day _(type: public)_
- 2026-05-05 — Children's Day _(type: public)_
- 2026-05-24 — Buddha's Birthday _(type: public)_
- 2026-07-17 — Constitution Day _(type: public)_
- 2026-08-15 — Liberation Day _(type: public)_
- 2026-09-24 — Korean Thanksgiving _(type: public)_
- 2026-10-03 — National Foundation Day _(type: public)_
- 2026-10-09 — Hangul Day _(type: public)_

_Beevago also defines 14 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-02-07 — Korean New Year _(type: public)_
- 2027-03-01 — Independence Movement Day _(type: public)_
- 2027-05-05 — Children's Day _(type: public)_
- 2027-05-13 — Buddha's Birthday _(type: public)_
- 2027-07-17 — Constitution Day _(type: public)_
- 2027-08-15 — Liberation Day _(type: public)_
- 2027-09-14 — Korean Thanksgiving _(type: public)_
- 2027-10-03 — National Foundation Day _(type: public)_
- 2027-10-09 — Hangul Day _(type: public)_

_Beevago also defines 14 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### LT

#### 2026

✅ Full agreement on resolved rule categories.

_Beevago also defines 2 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

✅ Full agreement on resolved rule categories.

_Beevago also defines 2 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### LU

#### 2026

✅ Full agreement on resolved rule categories.

#### 2027

✅ Full agreement on resolved rule categories.


### MA

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-01-14 — Amazigh New Year
- 2026-10-31 — Unity Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2026-06-16 — Islamic New Year _(type: public)_
- 2026-08-25 — Birthday of Muhammad (Mawlid) _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-01-14 — Amazigh New Year
- 2027-10-31 — Unity Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2027-06-06 — Islamic New Year _(type: public)_


### ME

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-11-13 — Njegos Day
- 2026-11-14 — Njegos Day Holiday

**`date-holidays` has, beevago rules don't produce:**

- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-04-02 — Pesach _(type: public)_
- 2026-04-05 — Easter Sunday _(type: public)_
- 2026-04-10 — Good Friday _(type: public)_
- 2026-04-12 — Easter Sunday _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2026-09-21 — Yom Kippur _(type: public)_
- 2026-11-01 — All Saints' Day _(type: public)_
- 2026-12-24 — Christmas Eve _(type: public)_
- 2026-12-25 — Christmas Day _(type: public)_
- 2026-12-26 — Christmas Day _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-11-13 — Njegos Day
- 2027-11-14 — Njegos Day Holiday

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-03-28 — Easter Sunday _(type: public)_
- 2027-04-22 — Pesach _(type: public)_
- 2027-04-30 — Good Friday _(type: public)_
- 2027-05-03 — Labour Day (substitute day) _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2027-10-11 — Yom Kippur _(type: public)_
- 2027-11-01 — All Saints' Day _(type: public)_
- 2027-12-24 — Christmas Eve _(type: public)_
- 2027-12-25 — Christmas Day _(type: public)_
- 2027-12-26 — Christmas Day _(type: public)_


### MK

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-06 — Orthodox Christmas Eve _(type: optional)_
- 2026-01-19 — Epiphany _(type: optional)_
- 2026-01-27 — St. Sava _(type: optional)_
- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-04-08 — International Roma Day _(type: optional)_
- 2026-04-10 — Orthodox Good Friday _(type: optional)_
- 2026-04-12 — Orthodox Easter _(type: public)_
- 2026-04-13 — Orthodox Easter Monday _(type: public)_
- 2026-05-23 — National Day of Authorities _(type: optional)_
- 2026-05-25 — Saints Cyril and Methodius Day (substitute day) _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: optional)_
- 2026-05-29 — Friday before Pentecost _(type: optional)_
- 2026-05-31 — Pentecost _(type: optional)_
- 2026-08-03 — Day of the Republic (substitute day) _(type: public)_
- 2026-08-28 — Assumption _(type: optional)_
- 2026-09-21 — Yom Kippur _(type: optional)_
- 2026-09-28 — International Day of Bosniaks _(type: optional)_
- 2026-10-12 — Revolution Day (substitute day) _(type: public)_
- 2026-11-01 — All Saints' Day _(type: optional)_
- 2026-11-22 — Day of the Albanian Alphabet _(type: optional)_
- 2026-12-21 — Turkish Language Day _(type: optional)_
- 2026-12-25 — Christmas Day _(type: optional)_

_Beevago also defines 9 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-06 — Orthodox Christmas Eve _(type: optional)_
- 2027-01-19 — Epiphany _(type: optional)_
- 2027-01-27 — St. Sava _(type: optional)_
- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-04-08 — International Roma Day _(type: optional)_
- 2027-04-30 — Orthodox Good Friday _(type: optional)_
- 2027-05-02 — Orthodox Easter _(type: public)_
- 2027-05-03 — Orthodox Easter Monday _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: optional)_
- 2027-05-23 — National Day of Authorities _(type: optional)_
- 2027-06-18 — Friday before Pentecost _(type: optional)_
- 2027-06-20 — Pentecost _(type: optional)_
- 2027-08-28 — Assumption _(type: optional)_
- 2027-09-28 — International Day of Bosniaks _(type: optional)_
- 2027-11-01 — All Saints' Day _(type: optional)_
- 2027-11-22 — Day of the Albanian Alphabet _(type: optional)_
- 2027-12-21 — Turkish Language Day _(type: optional)_
- 2027-12-25 — Christmas Day _(type: optional)_

_Beevago also defines 9 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### MT

#### 2026

✅ Full agreement on resolved rule categories.

#### 2027

✅ Full agreement on resolved rule categories.


### MX

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-05-05 — Anniversary of the Battle of Puebla
- 2026-10-12 — Day of the Race

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-02 — Constitution Day _(type: public)_
- 2026-03-16 — Benito Juárez's birthday _(type: public)_
- 2026-11-16 — Revolution Day _(type: public)_

_Beevago also defines 3 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-05-05 — Anniversary of the Battle of Puebla
- 2027-10-12 — Day of the Race

**`date-holidays` has, beevago rules don't produce:**

- 2027-02-01 — Constitution Day _(type: public)_
- 2027-03-15 — Benito Juárez's birthday _(type: public)_
- 2027-11-15 — Revolution Day _(type: public)_

_Beevago also defines 3 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### MY

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-01-14 — Birthday of Yang di-Pertuan Besar
- 2026-02-01 — Federal Territory Day
- 2026-02-20 — Independence Day Declaration Day
- 2026-03-04 — Anniversary of Installation of Sultan of Terengganu
- 2026-03-23 — Birthday of the Sultan of Johor
- 2026-04-03 — Good Friday
- 2026-04-26 — Birthday of the Sultan of Terengganu
- 2026-05-17 — Birthday of the Raja of Perlis
- 2026-05-22 — Hari Hol Pahang
- 2026-05-30 — Harvest Festival
- 2026-06-02 — Hari Gawai Dayak Day 2
- 2026-06-21 — Birthday of the Sultan of Kedah
- 2026-07-07 — Georgetown World Heritage City Day
- 2026-07-11 — Birthday of Penang Governor
- 2026-07-21 — Almarhum Sultan Iskandar Hol Day
- 2026-07-22 — Sarawak Day
- 2026-07-31 — Birthday of the Sultan of Pahang
- 2026-08-24 — Birthday of the Governor of Melaka
- 2026-09-29 — Birthday of the Sultan of Kelantan
- 2026-09-30 — Birthday of the Sultan of Kelantan Holiday
- 2026-10-10 — Birthday of the Governor of Sarawak
- 2026-11-06 — Birthday of the Sultan of Perak
- 2026-12-11 — Birthday of the Sultan of Selangor
- 2026-12-24 — Christmas Eve

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-17 — Chinese New Year _(type: public)_
- 2026-02-18 — Chinese New Year _(type: public)_
- 2026-03-07 — Day of Nuzul Al-Quran _(type: public)_
- 2026-03-21 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-03-22 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2026-06-17 — Islamic New Year _(type: public)_
- 2026-08-25 — Birthday of Muhammad (Mawlid) _(type: public)_
- 2026-11-08 — Deepavali _(type: public)_
- 2026-11-09 — Deepavali _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-01-14 — Birthday of Yang di-Pertuan Besar
- 2027-02-01 — Federal Territory Day
- 2027-02-20 — Independence Day Declaration Day
- 2027-03-04 — Anniversary of Installation of Sultan of Terengganu
- 2027-03-23 — Birthday of the Sultan of Johor
- 2027-03-26 — Good Friday
- 2027-04-26 — Birthday of the Sultan of Terengganu
- 2027-05-17 — Birthday of the Raja of Perlis
- 2027-05-22 — Hari Hol Pahang
- 2027-05-30 — Harvest Festival
- 2027-05-31 — Harvest Festival Day 2
- 2027-06-01 — Hari Gawai Dayak
- 2027-06-02 — Hari Gawai Dayak Day 2
- 2027-06-21 — Birthday of the Sultan of Kedah
- 2027-07-07 — Georgetown World Heritage City Day
- 2027-07-11 — Birthday of Penang Governor
- 2027-07-21 — Almarhum Sultan Iskandar Hol Day
- 2027-07-22 — Sarawak Day
- 2027-07-31 — Birthday of the Sultan of Pahang
- 2027-08-24 — Birthday of the Governor of Melaka
- 2027-09-29 — Birthday of the Sultan of Kelantan
- 2027-09-30 — Birthday of the Sultan of Kelantan Holiday
- 2027-10-10 — Birthday of the Governor of Sarawak
- 2027-11-06 — Birthday of the Sultan of Perak
- 2027-12-11 — Birthday of the Sultan of Selangor
- 2027-12-24 — Christmas Eve

**`date-holidays` has, beevago rules don't produce:**

- 2027-02-06 — Chinese New Year _(type: public)_
- 2027-02-07 — Chinese New Year _(type: public)_
- 2027-02-08 — Chinese New Year (substitute day) _(type: public)_
- 2027-02-24 — Day of Nuzul Al-Quran _(type: public)_
- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-03-10 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2027-06-06 — Islamic New Year _(type: public)_
- 2027-06-07 — Yang di-Pertuan Agong's Birthday _(type: public)_
- 2027-08-14 — Birthday of Muhammad (Mawlid) _(type: public)_
- 2027-10-28 — Deepavali _(type: public)_


### NG

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-03-20 — Id el Fitr _(type: public)_
- 2026-05-27 — Id el Kabir / Children's Day _(type: public / public)_
- 2026-06-16 — Islamic New Year _(type: public)_
- 2026-08-25 — Birthday of Muhammad (Mawlid) _(type: public)_
- 2026-11-01 — National Youth Day _(type: public)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-09 — Id el Fitr _(type: public)_
- 2027-05-03 — Worker's Day (substitute day) _(type: public)_
- 2027-05-16 — Id el Kabir _(type: public)_
- 2027-05-27 — Children's Day _(type: public)_
- 2027-06-06 — Islamic New Year _(type: public)_
- 2027-06-14 — Democracy Day (substitute day) _(type: public)_
- 2027-08-14 — Birthday of Muhammad (Mawlid) _(type: public)_
- 2027-11-01 — National Youth Day _(type: public)_


### NL

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-05-05 — Liberation Day _(type: school)_
- 2026-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 1 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-05-05 — Liberation Day _(type: school)_
- 2027-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 1 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### NO

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-07-29 — Olsok _(type: optional)_
- 2026-12-24 — Christmas Eve _(type: bank)_
- 2026-12-31 — New Year's Eve _(type: bank)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-07-29 — Olsok _(type: optional)_
- 2027-12-24 — Christmas Eve _(type: bank)_
- 2027-12-31 — New Year's Eve _(type: bank)_


### NZ

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-06 — Waitangi Day _(type: public)_
- 2026-04-25 — ANZAC Day _(type: public)_
- 2026-04-27 — ANZAC Day (substitute day) _(type: public)_
- 2026-06-01 — King's Birthday _(type: public)_
- 2026-07-10 — Matariki _(type: public)_
- 2026-10-26 — Labour Day _(type: public)_
- 2026-12-28 — Boxing Day (substitute day) _(type: public)_

_Beevago also defines 5 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-04 — Day after New Year's Day (substitute day) _(type: public)_
- 2027-02-06 — Waitangi Day _(type: public)_
- 2027-02-08 — Waitangi Day (substitute day) _(type: public)_
- 2027-04-25 — ANZAC Day _(type: public)_
- 2027-04-26 — ANZAC Day (substitute day) _(type: public)_
- 2027-06-07 — King's Birthday _(type: public)_
- 2027-06-25 — Matariki _(type: public)_
- 2027-10-25 — Labour Day _(type: public)_
- 2027-12-27 — Christmas Day (substitute day) _(type: public)_
- 2027-12-28 — Boxing Day (substitute day) _(type: public)_

_Beevago also defines 5 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### OM

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-11-20 — National Day
- 2026-11-21 — National Day (Day 2)

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-11-20 — National Day
- 2027-11-21 — National Day (Day 2)


### PA

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-11-04 — Flag Day
- 2026-11-05 — Colon Day
- 2026-12-20 — National Mourning Day

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-11-04 — Flag Day
- 2027-11-05 — Colon Day
- 2027-12-20 — National Mourning Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-11-29 — Independence Day (substitute day) _(type: public)_


### PE

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-06-07 — Battle of Arica
- 2026-07-23 — Peruvian Air Force Day
- 2026-08-06 — Battle of Junin
- 2026-12-09 — Battle of Ayacucho

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-05 — Easter Sunday _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-06-07 — Battle of Arica
- 2027-07-23 — Peruvian Air Force Day
- 2027-08-06 — Battle of Junin
- 2027-12-09 — Battle of Ayacucho

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-28 — Easter Sunday _(type: public)_


### PH

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-02-25 — EDSA People Power Revolution Anniversary

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-17 — Chinese New Year _(type: optional)_
- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-04-05 — Easter Sunday _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2026-08-31 — National Heroes' Day _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-02-25 — EDSA People Power Revolution Anniversary

**`date-holidays` has, beevago rules don't produce:**

- 2027-02-06 — Chinese New Year _(type: optional)_
- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-03-28 — Easter Sunday _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2027-08-30 — National Heroes' Day _(type: public)_


### PL

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-02 — Maundy Thursday _(type: school)_
- 2026-04-03 — Good Friday _(type: school)_
- 2026-05-02 — Flag Day _(type: optional)_
- 2026-12-24 — Christmas Eve _(type: public)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-25 — Maundy Thursday _(type: school)_
- 2027-03-26 — Good Friday _(type: school)_
- 2027-05-02 — Flag Day _(type: optional)_
- 2027-12-24 — Christmas Eve _(type: public)_


### PT

#### 2026

✅ Full agreement on resolved rule categories.

#### 2027

✅ Full agreement on resolved rule categories.


### PY

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-03-01 — Heroes' Day _(type: public)_
- 2026-04-30 — Teacher's Day _(type: optional)_
- 2026-06-12 — Chaco Armistice _(type: public)_
- 2026-09-29 — Boqueron Battle Victory Day _(type: public)_
- 2026-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 4 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-01 — Heroes' Day _(type: public)_
- 2027-04-30 — Teacher's Day _(type: optional)_
- 2027-06-12 — Chaco Armistice _(type: public)_
- 2027-09-29 — Boqueron Battle Victory Day _(type: public)_
- 2027-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 4 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### RO

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-01-02 — New Year Holiday
- 2026-04-03 — Orthodox Good Friday
- 2026-04-05 — Orthodox Easter Sunday
- 2026-04-06 — Orthodox Easter Monday
- 2026-05-24 — Orthodox Whit Sunday
- 2026-05-25 — Orthodox Whit Monday

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-10 — Good Friday _(type: public)_
- 2026-04-12 — Easter Sunday _(type: public)_
- 2026-04-13 — Easter Monday _(type: public)_
- 2026-05-31 — Pentecost _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-01-02 — New Year Holiday
- 2027-03-26 — Orthodox Good Friday
- 2027-03-28 — Orthodox Easter Sunday
- 2027-03-29 — Orthodox Easter Monday
- 2027-05-16 — Orthodox Whit Sunday
- 2027-05-17 — Orthodox Whit Monday

**`date-holidays` has, beevago rules don't produce:**

- 2027-04-30 — Good Friday _(type: public)_
- 2027-05-02 — Easter Sunday _(type: public)_
- 2027-05-03 — Easter Monday _(type: public)_
- 2027-06-20 — Pentecost _(type: public)_
- 2027-06-21 — Whit Monday _(type: public)_


### RS

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-01 — New Year's Day _(type: public)_
- 2026-01-02 — New Year's Day _(type: public)_
- 2026-02-16 — Statehood Day _(type: public)_
- 2026-02-17 — Statehood Day _(type: public)_
- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: optional)_
- 2026-04-03 — Good Friday _(type: optional)_
- 2026-04-05 — Easter Sunday _(type: optional)_
- 2026-04-06 — Easter Monday _(type: optional)_
- 2026-04-10 — Orthodox Good Friday _(type: public)_
- 2026-04-12 — Orthodox Easter _(type: public)_
- 2026-04-13 — Orthodox Easter Monday _(type: public)_
- 2026-05-01 — Labour Day _(type: public)_
- 2026-05-02 — Labour Day _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: optional)_
- 2026-09-21 — Yom Kippur _(type: optional)_
- 2026-11-11 — Armistice Day _(type: public)_
- 2026-12-25 — Christmas Day _(type: optional)_

_Beevago also defines 12 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-01 — New Year's Day _(type: public)_
- 2027-01-02 — New Year's Day _(type: public)_
- 2027-02-15 — Statehood Day _(type: public)_
- 2027-02-16 — Statehood Day _(type: public)_
- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: optional)_
- 2027-03-26 — Good Friday _(type: optional)_
- 2027-03-28 — Easter Sunday _(type: optional)_
- 2027-03-29 — Easter Monday _(type: optional)_
- 2027-04-30 — Orthodox Good Friday _(type: public)_
- 2027-05-01 — Labour Day _(type: public)_
- 2027-05-02 — Orthodox Easter _(type: public)_
- 2027-05-03 — Orthodox Easter Monday / Labour Day _(type: public / public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: optional)_
- 2027-10-11 — Yom Kippur _(type: optional)_
- 2027-11-11 — Armistice Day _(type: public)_
- 2027-12-25 — Christmas Day _(type: optional)_

_Beevago also defines 12 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### SA

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-03-19 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-05-26 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-05-15 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_


### SE

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-05 — Twelfth Night _(type: optional)_
- 2026-04-30 — Walpurgis Night _(type: optional)_
- 2026-06-19 — Midsummer Eve _(type: bank)_
- 2026-06-20 — Midsummer Day _(type: public)_
- 2026-10-30 — Halloween _(type: optional)_
- 2026-10-31 — All Saints' Day _(type: public)_
- 2026-12-24 — Christmas Eve _(type: bank)_
- 2026-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 2 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-05 — Twelfth Night _(type: optional)_
- 2027-04-30 — Walpurgis Night _(type: optional)_
- 2027-06-25 — Midsummer Eve _(type: bank)_
- 2027-06-26 — Midsummer Day _(type: public)_
- 2027-11-05 — Halloween _(type: optional)_
- 2027-11-06 — All Saints' Day _(type: public)_
- 2027-12-24 — Christmas Eve _(type: bank)_
- 2027-12-31 — New Year's Eve _(type: bank)_

_Beevago also defines 2 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### SG

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-17 — Chinese New Year _(type: public)_
- 2026-02-18 — Chinese New Year _(type: public)_
- 2026-03-21 — Hari Raya Puasa _(type: public)_
- 2026-04-03 — Good Friday _(type: public)_
- 2026-05-27 — Hari Raya Haji _(type: public)_
- 2026-05-31 — Vesak Day _(type: public)_
- 2026-06-01 — Vesak Day _(type: public)_
- 2026-08-10 — National Day (substitute day) _(type: public)_
- 2026-11-08 — Deepavali _(type: public)_
- 2026-11-09 — Deepavali _(type: public)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-02-06 — Chinese New Year _(type: public)_
- 2027-02-07 — Chinese New Year _(type: public)_
- 2027-02-08 — Chinese New Year (substitute day) _(type: public)_
- 2027-03-09 — Hari Raya Puasa _(type: public)_
- 2027-03-26 — Good Friday _(type: public)_
- 2027-05-16 — Hari Raya Haji _(type: public)_
- 2027-10-28 — Deepavali _(type: public)_


### SI

#### 2026

✅ Full agreement on resolved rule categories.

#### 2027

✅ Full agreement on resolved rule categories.


### SK

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-05-08 — Victory over Fascism Day
- 2026-09-15 — Our Lady of Sorrows
- 2026-11-17 — Struggle for Freedom and Democracy Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-04-05 — Easter Sunday _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-05-08 — Victory over Fascism Day
- 2027-09-15 — Our Lady of Sorrows
- 2027-11-17 — Struggle for Freedom and Democracy Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-28 — Easter Sunday _(type: public)_


### SR

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-17 — Chinese New Year _(type: public)_
- 2026-02-25 — Day of Liberation and Innovation _(type: public)_
- 2026-03-03 — Holi Phagwa _(type: public)_
- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2026-11-08 — Deepavali _(type: public)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-02-06 — Chinese New Year _(type: public)_
- 2027-02-25 — Day of Liberation and Innovation _(type: public)_
- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-03-22 — Holi Phagwa _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2027-10-28 — Deepavali _(type: public)_


### TH

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-05-01 — National Labour Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-03-03 — Makha Bucha _(type: public)_
- 2026-05-31 — Vesak Day _(type: public)_
- 2026-07-29 — Asalha Puja _(type: public)_
- 2026-07-30 — Buddhist Lent _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-05-01 — National Labour Day


### TN

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-12-17 — Revolution and Youth Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-14 — عيد الثورة و الشباب _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2026-06-16 — Islamic New Year _(type: public)_
- 2026-08-25 — Birthday of Muhammad (Mawlid) _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-12-17 — Revolution and Youth Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-14 — عيد الثورة و الشباب _(type: public)_
- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_
- 2027-06-06 — Islamic New Year _(type: public)_
- 2027-08-14 — Birthday of Muhammad (Mawlid) _(type: public)_


### TR

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-03-20 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2026-05-27 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-09 — End of Ramadan (Eid al-Fitr) _(type: public)_
- 2027-05-16 — Feast of the Sacrifice (Eid al-Adha) _(type: public)_


### TW

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-16 — Chinese New Year's Eve _(type: public)_
- 2026-02-17 — Chinese New Year _(type: public)_
- 2026-02-18 — The second day of the Chinese New Year _(type: public)_
- 2026-02-19 — The third day of the Chinese New Year _(type: public)_
- 2026-02-20 — The forth day of the Chinese New Year _(type: public)_
- 2026-02-21 — Chinese New Year Holiday _(type: public)_
- 2026-02-28 — Peace Memorial Day _(type: public)_
- 2026-04-04 — Children's Day _(type: public)_
- 2026-04-05 — Tomb Sweeping Day _(type: public)_
- 2026-04-06 — Tomb Sweeping Day (substitute day) _(type: public)_
- 2026-06-19 — Dragon Boat Festival _(type: public)_
- 2026-09-25 — Mid-Autumn Festival _(type: public)_
- 2026-10-10 — National Day / Double Tenth Day _(type: public)_

_Beevago also defines 15 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-02-05 — Chinese New Year's Eve _(type: public)_
- 2027-02-06 — Chinese New Year _(type: public)_
- 2027-02-07 — The second day of the Chinese New Year _(type: public)_
- 2027-02-08 — The third day of the Chinese New Year _(type: public)_
- 2027-02-09 — The forth day of the Chinese New Year _(type: public)_
- 2027-02-10 — Chinese New Year Holiday _(type: public)_
- 2027-02-28 — Peace Memorial Day _(type: public)_
- 2027-03-01 — Peace Memorial Day (substitute day) _(type: public)_
- 2027-04-04 — Children's Day _(type: public)_
- 2027-04-05 — Children's Day (substitute day) / Tomb Sweeping Day _(type: public / public)_
- 2027-06-09 — Dragon Boat Festival _(type: public)_
- 2027-09-15 — Mid-Autumn Festival _(type: public)_
- 2027-10-10 — National Day / Double Tenth Day _(type: public)_
- 2027-10-11 — National Day / Double Tenth Day (substitute day) _(type: public)_
- 2027-12-31 — Founding of the Republic of China (substitute day) _(type: public)_

_Beevago also defines 15 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### US

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-02-12 — Lincoln's Birthday
- 2026-02-17 — Mardi Gras
- 2026-03-31 — Cesar Chavez Day
- 2026-04-03 — Good Friday
- 2026-04-16 — Emancipation Day
- 2026-04-30 — Arbor Day
- 2026-05-08 — Truman Day
- 2026-06-11 — King Kamehameha Day
- 2026-06-20 — West Virginia Day
- 2026-07-24 — Pioneer Day
- 2026-08-16 — Bennington Battle Day
- 2026-10-18 — Alaska Day
- 2026-10-31 — Nevada Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-19 — Martin Luther King Jr. Day _(type: public)_
- 2026-02-16 — Washington's Birthday _(type: public)_
- 2026-05-25 — Memorial Day _(type: public)_
- 2026-07-03 — Independence Day (substitute day) _(type: public)_
- 2026-09-07 — Labour Day _(type: public)_
- 2026-10-12 — Columbus Day _(type: public)_
- 2026-11-26 — Thanksgiving Day _(type: public)_
- 2026-12-24 — Christmas Eve _(type: optional)_

_Beevago also defines 6 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-02-09 — Mardi Gras
- 2027-02-12 — Lincoln's Birthday
- 2027-03-26 — Good Friday
- 2027-03-31 — Cesar Chavez Day
- 2027-04-16 — Emancipation Day
- 2027-04-30 — Arbor Day
- 2027-05-08 — Truman Day
- 2027-06-11 — King Kamehameha Day
- 2027-06-20 — West Virginia Day
- 2027-07-24 — Pioneer Day
- 2027-08-16 — Bennington Battle Day
- 2027-10-18 — Alaska Day
- 2027-10-31 — Nevada Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-18 — Martin Luther King Jr. Day _(type: public)_
- 2027-02-15 — Washington's Birthday _(type: public)_
- 2027-05-31 — Memorial Day _(type: public)_
- 2027-06-18 — Juneteenth (substitute day) _(type: public)_
- 2027-07-05 — Independence Day (substitute day) _(type: public)_
- 2027-09-06 — Labour Day _(type: public)_
- 2027-10-11 — Columbus Day _(type: public)_
- 2027-11-25 — Thanksgiving Day _(type: public)_
- 2027-12-24 — Christmas Day (substitute day) / Christmas Eve _(type: public / optional)_
- 2027-12-31 — New Year's Day (substitute day) _(type: public)_

_Beevago also defines 6 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### UY

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-01-06 — Epiphany
- 2026-02-16 — Carnival Monday
- 2026-02-17 — Carnival Tuesday
- 2026-03-30 — Tourism Monday
- 2026-03-31 — Tourism Tuesday
- 2026-04-01 — Tourism Wednesday
- 2026-06-19 — Artigas Birthday
- 2026-11-02 — All Souls Day

_Beevago also defines 3 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-01-06 — Epiphany
- 2027-02-08 — Carnival Monday
- 2027-02-09 — Carnival Tuesday
- 2027-03-22 — Tourism Monday
- 2027-03-23 — Tourism Tuesday
- 2027-03-24 — Tourism Wednesday
- 2027-06-19 — Artigas Birthday
- 2027-11-02 — All Souls Day

_Beevago also defines 3 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._


### VE

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-05-15 — Venezuelan Family Day

**`date-holidays` has, beevago rules don't produce:**

- 2026-01-15 — Teacher's Day _(type: optional)_
- 2026-04-05 — Easter Sunday _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-05-15 — Venezuelan Family Day

**`date-holidays` has, beevago rules don't produce:**

- 2027-01-15 — Teacher's Day _(type: optional)_
- 2027-03-28 — Easter Sunday _(type: public)_


### VN

#### 2026

**Beevago has (resolved), lib does not:**

- 2026-09-03 — National Day (Day 2)

**`date-holidays` has, beevago rules don't produce:**

- 2026-02-16 — Vietnamese New Year Holidays _(type: public)_
- 2026-02-17 — Vietnamese New Year _(type: public)_
- 2026-04-26 — Hung Kings Commemorations _(type: public)_

#### 2027

**Beevago has (resolved), lib does not:**

- 2027-09-03 — National Day (Day 2)

**`date-holidays` has, beevago rules don't produce:**

- 2027-02-05 — Vietnamese New Year Holidays _(type: public)_
- 2027-02-06 — Vietnamese New Year _(type: public)_
- 2027-04-16 — Hung Kings Commemorations _(type: public)_


### ZA

#### 2026

**`date-holidays` has, beevago rules don't produce:**

- 2026-08-10 — Public Holiday _(type: public)_

_Beevago also defines 10 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._

#### 2027

**`date-holidays` has, beevago rules don't produce:**

- 2027-03-22 — Public Holiday _(type: public)_
- 2027-12-27 — Public Holiday _(type: public)_

_Beevago also defines 10 custom-calculated + 0 lunar + 0 religious rules that this script does not resolve._
