import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  keywords: [
    "best time to travel",
    "travel timing",
    "holiday planner",
    "avoid crowds",
    "cheaper travel dates",
    "school holidays",
    "public holidays",
  ],
  openGraph: {
    type: "website",
    siteName: "BreakHeroes",
    title: "BreakHeroes — Travel at the right time",
    description:
      "Timing intelligence for travelers. Find the best windows, avoid the worst.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BreakHeroes — Travel at the right time",
    description:
      "Timing intelligence for travelers. Find the best windows, avoid the worst.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
