import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "North Software — Construído no Norte. Feito para o mundo.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#030B17",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#3DAFA6",
          }}
        />

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 52 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "#3DAFA6",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "#030B17",
            }}
          >
            N
          </div>
          <span style={{ color: "#E8E3DC", fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
            North Software
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <span
            style={{
              color: "#E8E3DC",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Construído no Norte.
          </span>
          <span
            style={{
              color: "#3DAFA6",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Feito para o mundo.
          </span>
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            color: "#3D5A63",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          northsoftware.com.br
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
