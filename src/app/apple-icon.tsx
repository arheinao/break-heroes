import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(135deg, rgb(234,88,12), rgb(220,60,0))",
        }}
      >
        <svg
          width="135"
          height="135"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="6.5" x2="12" y2="4" />
          <line x1="16.75" y1="7.77" x2="18" y2="5.61" />
          <line x1="7.25" y1="7.77" x2="6" y2="5.61" />
          <line x1="20.23" y1="11.25" x2="22.39" y2="10" />
          <line x1="3.77" y1="11.25" x2="1.61" y2="10" />
          <line
            x1="2.5"
            y1="17"
            x2="21.5"
            y2="17"
            strokeWidth="1.5"
          />
          <path d="M6 15.5 a6 6 0 0 1 12 0" />
        </svg>
      </div>
    ),
    size,
  );
}
