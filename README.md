# BreakHeroes

Timing intelligence for travelers. Find the best windows to travel, avoid the worst.

## Stack

- **Next.js 15** with App Router (TypeScript)
- **Tailwind CSS v4** (custom design system)
- **Static export** (`output: 'export'`)
- **Cloudflare Pages** for hosting (zero-cost, unlimited bandwidth)
- **Supabase** for email capture (direct-insert with Row Level Security)
- **Client-side scoring** — no runtime APIs, no server compute costs

## Architecture

```
src/
├── app/
│   ├── page.tsx                             homepage
│   ├── destinations/
│   │   ├── page.tsx                         destinations index
│   │   └── [slug]/
│   │       ├── page.tsx                     static page (generateStaticParams)
│   │       └── DestinationRecommender.tsx   client-side recommender widget
│   ├── search/                              full search experience
│   ├── about/                               methodology
│   └── layout.tsx                           root layout with header/footer
├── components/                              shared UI
├── data/
│   ├── destinations.json                    curated destinations
│   ├── origin-markets.json                  UK for MVP
│   └── timing-rules.json                    editable weights and thresholds
└── lib/
    ├── scoring/
    │   ├── types.ts                         type system
    │   ├── engine.ts                        orchestrator
    │   ├── origin-pressure.ts               layer 1
    │   ├── destination-disruption.ts        layer 2
    │   └── seasonality.ts                   layer 3
    └── signup.ts                            Supabase direct-insert
```

## Scoring model

Each candidate travel window is scored across three independent layers:

| Layer | Signal |
|---|---|
| **Origin pressure** | Demand from home country (school breaks, public holidays) |
| **Destination disruption** | Local events at destination (Golden Week, Ferragosto, Tết) |
| **Seasonality** | Weather, best/shoulder/poor months, rainy/typhoon seasons |

Layers combine using priority-specific weights (balanced, cheapest, least-crowded, best-weather).

## Cost model

| Item | Cost |
|---|---|
| Hosting | Cloudflare Pages free (unlimited bandwidth) |
| Database | Supabase free tier (email signups only) |
| Bot traffic | **$0** — static HTML, no function invocations possible |
| **Monthly total** | **$0** |

## Running locally

```bash
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase project details:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Without these, the signup form operates in simulated mode (logs to console).

### Supabase table setup

```sql
create table email_signups (
  id bigserial primary key,
  email text not null,
  destination text,
  created_at timestamptz default now()
);

alter table email_signups enable row level security;

create policy "Allow public insert"
  on email_signups for insert
  to anon
  with check (true);
```

## Deploying to Cloudflare Pages

1. Push to GitHub
2. Cloudflare Dashboard → Pages → Connect repository
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `out`
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables
5. Deploy

## Next steps

- [ ] Port beevago's holiday calculator (`holidayCalculator.js`) to TypeScript
- [ ] Add `scripts/precompute.mjs` to normalize beevago's holiday JSON into per-destination bundles
- [ ] Expand beyond UK origin market
- [ ] Add scheduled GitHub Action for monthly rebuilds (refresh holiday data)
