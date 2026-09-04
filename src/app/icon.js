import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#241f1c",
          borderRadius: 96,
        }}
      >
        <span
          style={{
            fontSize: 260,
            fontWeight: 600,
            color: "#c8b79c",
            fontFamily: "serif",
          }}
        >
          M
        </span>
      </div>
    ),
    { ...size }
  );
}
