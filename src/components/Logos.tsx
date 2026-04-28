type LogoProps = { className?: string };

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-[rgb(220_60_0)] flex items-center justify-center shadow-soft">
      {children}
    </div>
  );
}

export function LogoSunrise({ className }: LogoProps) {
  return (
    <Frame>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className ?? "h-5 w-5 text-white"}
      >
        <line x1="12" y1="6.5" x2="12" y2="4" />
        <line x1="16.75" y1="7.77" x2="18" y2="5.61" />
        <line x1="7.25" y1="7.77" x2="6" y2="5.61" />
        <line x1="20.23" y1="11.25" x2="22.39" y2="10" />
        <line x1="3.77" y1="11.25" x2="1.61" y2="10" />
        <line x1="2.5" y1="17" x2="21.5" y2="17" strokeWidth={1.5} />
        <path d="M6 15.5 a6 6 0 0 1 12 0" />
      </svg>
    </Frame>
  );
}

export function LogoCalendar({ className }: LogoProps) {
  return (
    <Frame>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className ?? "h-5 w-5 text-white"}
      >
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" />
        <line x1="8" y1="3" x2="8" y2="6.5" />
        <line x1="16" y1="3" x2="16" y2="6.5" />
        <circle cx="12" cy="15" r="2.25" fill="currentColor" stroke="none" />
      </svg>
    </Frame>
  );
}

export function LogoCompass({ className }: LogoProps) {
  return (
    <Frame>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className ?? "h-5 w-5 text-white"}
      >
        <circle cx="12" cy="12" r="9" />
        <path
          d="M12 12 L 16.5 7.5 L 14.5 9 Z"
          fill="currentColor"
          stroke="none"
        />
        <path d="M12 12 L 7.5 16.5 L 9.5 15" fill="none" />
        <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    </Frame>
  );
}

export function Wordmark({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const cls =
    size === "sm"
      ? "text-lg"
      : size === "lg"
        ? "text-5xl"
        : "text-2xl";
  return (
    <span
      className={`font-display font-semibold tracking-tight ${cls} inline-flex items-baseline`}
    >
      <span className="text-foreground">Break</span>
      <span className="text-primary">Heroes</span>
      <span
        className="ml-0.5 text-primary"
        aria-hidden
      >
        .
      </span>
    </span>
  );
}
