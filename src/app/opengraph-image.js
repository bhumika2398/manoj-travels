import { ImageResponse } from "next/og";
import { business } from "@/config/business.config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#241f1c",
          color: "#f5f0ea",
        }}
      >
        <span style={{ fontSize: 26, letterSpacing: 6, color: "#c8b79c", textTransform: "uppercase" }}>
          {business.availabilityLabel}
        </span>
        <span style={{ fontSize: 76, fontWeight: 600, marginTop: 24, lineHeight: 1.05 }}>
          Manoj Tours &amp; Travels
        </span>
        <span style={{ fontSize: 32, marginTop: 16, color: "#c3b6ab" }}>
          Manoj Taxi Service — Bangalore
        </span>
        <span style={{ fontSize: 28, marginTop: 40, color: "#c8b79c" }}>
          Local · Outstation · Airport · Round Trips
        </span>
      </div>
    ),
    { ...size }
  );
}
