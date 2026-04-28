import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Find your best travel dates",
  description:
    "Pick a destination and priority. We'll show you the best and worst windows — with plain-language reasons.",
};

export default function SearchPage() {
  return <SearchClient />;
}
