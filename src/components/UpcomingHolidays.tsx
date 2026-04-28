import { useTranslations } from "next-intl";
import { getPublicHolidays } from "@/lib/holidays";

export default function UpcomingHolidays({
  countryCode,
  countryName,
}: {
  countryCode: string;
  countryName: string;
}) {
  const t = useTranslations("upcomingHolidays");
  const tMonths = useTranslations("months");
  const year = new Date().getFullYear();
  const holidays = getPublicHolidays(countryCode, year).filter(
    (h) => h.type !== "bank" || h.impactHint !== "low",
  );

  if (!holidays.length) return null;

  const firstTen = holidays.slice(0, 10);
  const monthKeys = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ] as const;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{t("title", { year })}</h3>
        <span className="text-xs font-mono text-muted-foreground">
          {t("total", { count: holidays.length })}
        </span>
      </div>
      <ul className="space-y-2">
        {firstTen.map((h) => {
          const d = new Date(h.date);
          return (
            <li
              key={`${h.key}-${h.date}`}
              className="flex items-start justify-between gap-3 text-sm"
            >
              <div className="min-w-0">
                <div className="font-medium truncate">{h.name}</div>
                <div className="text-xs text-muted-foreground">
                  {d.getDate()} {tMonths(monthKeys[d.getMonth()])}
                </div>
              </div>
              {(h.impactHint === "high" || h.impactHint === "severe") && (
                <span className="inline-flex shrink-0 items-center rounded-md bg-danger/10 text-[rgb(127_29_29)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  {t("major")}
                </span>
              )}
            </li>
          );
        })}
      </ul>
      {holidays.length > firstTen.length && (
        <p className="mt-4 text-xs text-muted-foreground">
          {t("more", {
            count: holidays.length - firstTen.length,
            country: countryName,
            year,
          })}
        </p>
      )}
    </div>
  );
}
