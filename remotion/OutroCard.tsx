import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const OutroCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: { damping: 80, stiffness: 200 },
  });

  const textOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textY = interpolate(frame, [10, 25], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgesOpacity = interpolate(frame, [30, 45], [0, 1], {
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
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.03)",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          Built with Stitch + React
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Corsair Command Design System
        </div>
      </div>

      {/* Tech badges */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          display: "flex",
          gap: 16,
          opacity: badgesOpacity,
        }}
      >
        {["React 19", "TypeScript", "Tailwind v4", "shadcn/ui", "Vite"].map(
          (tech) => (
            <div
              key={tech}
              style={{
                padding: "8px 20px",
                borderRadius: 100,
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {tech}
            </div>
          )
        )}
      </div>
    </AbsoluteFill>
  );
};
