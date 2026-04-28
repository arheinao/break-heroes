import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LogoSunrise } from "@/components/Logos";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <LogoSunrise />
          <span className="font-display font-semibold text-lg tracking-tight">
            BreakHeroes
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link
            href="/destinations"
            className="hover:text-foreground transition-colors"
          >
            {t("destinations")}
          </Link>
          <Link
            href="/search"
            className="hover:text-foreground transition-colors"
          >
            {t("findDates")}
          </Link>
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            {t("methodology")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t("startPlanning")}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
