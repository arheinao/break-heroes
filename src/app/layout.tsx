import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://breakheroes.com"),
  title: {
    default: "BreakHeroes — Travel at the right time",
    template: "%s | BreakHeroes",
  },
  description:
    "Find the best time to travel — not just the cheapest. We analyze holidays, crowds, and seasonality to tell you exactly when to go, and when to avoid.",
};

// html lang is "en" at static-render time. Per-locale signals come via
// hreflang alternates on every page (see lib/seo.tsx) — that's what Google
// uses to rank locale variants. A client-side patch updates the lang attribute
// after hydration based on the URL locale.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
