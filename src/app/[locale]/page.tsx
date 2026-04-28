import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ExampleResult from "@/components/ExampleResult";
import FeaturedDestinations from "@/components/FeaturedDestinations";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HowItWorks />
      <ExampleResult />
      <FeaturedDestinations />
    </>
  );
}
