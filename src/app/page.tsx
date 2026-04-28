// Static fallback for /. In production, public/_redirects rewrites
// / → /en/ at the edge before this page is ever served. In dev (where
// Cloudflare _redirects don't run), this script handles it.
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: { canonical: "https://breakheroes.com/en/" },
  robots: { index: false, follow: true },
};

export default function Root() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.location.replace("/en/");',
        }}
      />
      <noscript>
        <p>
          <a href="/en/" className="text-primary underline">
            Continue to BreakHeroes →
          </a>
        </p>
      </noscript>
    </main>
  );
}
