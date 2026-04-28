import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import PrivacyContentEN from "./content/en";
import PrivacyContentDE from "./content/de";
import PrivacyContentES from "./content/es";

const CONTENT = {
  en: PrivacyContentEN,
  de: PrivacyContentDE,
  es: PrivacyContentES,
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/privacy/"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const Content = CONTENT[locale as keyof typeof CONTENT] ?? PrivacyContentEN;

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      {locale !== "en" && (
        <div className="mb-10 rounded-lg border border-border bg-muted/40 p-4">
          <p className="text-sm font-semibold">
            {t("translationDisclaimer.title")}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("translationDisclaimer.text")}
          </p>
        </div>
      )}
      <div className="prose prose-neutral max-w-none [&>h1]:font-display [&>h1]:text-4xl [&>h1]:sm:text-5xl [&>h1]:font-semibold [&>h1]:tracking-tight [&>h1]:mb-4 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:mt-12 [&>section>h2]:mt-12 [&>section>h2]:mb-3 [&>section>h2]:font-display [&>section>h2]:text-2xl [&>section>h2]:font-semibold [&>section>h2]:tracking-tight [&>section>h3]:font-display [&>section>h3]:text-lg [&>section>h3]:font-semibold [&>section>h3]:tracking-tight [&>section>h3]:mt-6 [&>section>h3]:mb-2 [&>section>p]:text-muted-foreground [&>section>p]:leading-relaxed [&>section>p]:mb-4 [&>section>ul]:text-muted-foreground [&>section>ul]:leading-relaxed [&>section>ul]:mb-4 [&>section>ul]:space-y-2 [&>section>ul]:pl-5 [&>section>ul]:list-disc [&_strong]:text-foreground [&_a]:text-primary [&_a:hover]:underline">
        <Content />
      </div>
    </article>
  );
}
