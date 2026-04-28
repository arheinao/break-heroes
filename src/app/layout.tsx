import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://breakheroes.com"),
  title: {
    default: "BreakHeroes — Travel at the right time",
    template: "%s | BreakHeroes",
  },
  description:
    "Find the best time to travel — not just the cheapest. We analyze holidays, crowds, and seasonality to tell you exactly when to go, and when to avoid.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
