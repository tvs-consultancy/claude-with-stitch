import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    fps,
    frame,
    config: { damping: 80, stiffness: 200 },
  });

  const titleOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [15, 30], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [30, 45], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #174468 0%, #335C81 50%, #264466 100%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Geist', system-ui, sans-serif",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.06)",
          top: -100,
          right: -100,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.04)",
          bottom: -50,
          left: -50,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${logoScale})`,
            backdropFilter: "blur(10px)",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          MediaPlan Pro
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            fontSize: 24,
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.02em",
          }}
        >
          AI-Powered Media Planning Platform
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            marginTop: 16,
            padding: "8px 24px",
            borderRadius: 100,
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          Product Walkthrough
        </div>
      </div>
    </AbsoluteFill>
  );
};
