import { ImageResponse } from "next/og";
import { EVENT } from "@/data/event";

export const alt = "MONOLITH — 21-22 December 2026";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#050816",
          backgroundImage:
            "radial-gradient(circle at 50% 28%, rgba(109, 63, 224, 0.34), transparent 62%), radial-gradient(circle at 12% 92%, rgba(19, 29, 82, 0.72), transparent 52%)",
          color: "#ECEBFF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 360,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 140,
              height: 315,
              borderRadius: 8,
              border: "1px solid rgba(183, 157, 251, 0.48)",
              background:
                "linear-gradient(155deg, rgba(139, 92, 246, 0.26), rgba(19, 29, 82, 0.72) 55%, rgba(5, 8, 22, 0.95))",
              boxShadow: "0 30px 80px -20px rgba(109, 63, 224, 0.55)",
            }}
          />
          <div
            style={{
              position: "relative",
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#ECEBFF",
              textShadow: "0 8px 32px rgba(5, 8, 22, 0.9)",
            }}
          >
            MONOLITH
          </div>
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 28,
            color: "#A9ABD8",
          }}
        >
          A two-day technology festival. Lead on Day 1, build on Day 2.
        </div>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            gap: 16,
            fontSize: 20,
            color: "#B79DFB",
          }}
        >
          <span>{EVENT.EVENT_DATES.shortRange}</span>
          <span>Organised by {EVENT.ORGANISER}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
