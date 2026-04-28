import { useTranslations } from "next-intl";
import type { BeevagoPost } from "@/lib/beevago-posts";

export default function BeevagoPosts({
  posts,
  title,
  subtitle,
}: {
  posts: BeevagoPost[];
  title?: string;
  subtitle?: string;
}) {
  const t = useTranslations("posts");
  if (!posts.length) return null;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      )}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {posts.map((p) => (
          <li key={p.id}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors"
            >
              {p.image && (
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-sm leading-snug line-clamp-2">
                  {p.title}
                </h3>
                {p.excerpt && (
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    {p.excerpt}
                  </p>
                )}
                <span className="mt-3 inline-flex text-[11px] font-medium uppercase tracking-wider text-primary">
                  {t("readOn")}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
