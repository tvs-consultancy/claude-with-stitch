import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

interface PageSceneProps {
  readonly src: string;
  readonly title: string;
  readonly subtitle: string;
}

export const PageScene: React.FC<PageSceneProps> = ({
  src,
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Label animation
  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelY = interpolate(frame, [0, 15], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screenshot scale-in with spring
  const screenshotScale = spring({
    fps,
    frame: frame - 5,
    config: { damping: 100, stiffness: 150 },
    from: 0.92,
    to: 1,
  });

  // Subtle ken-burns zoom over the duration
  const slowZoom = interpolate(frame, [0, 150], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const screenshotOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F1117",
        fontFamily: "'Geist', system-ui, sans-serif",
      }}
    >
      {/* Background gradient accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at top left, rgba(23,68,104,0.15) 0%, transparent 50%)",
        }}
      />

      {/* Top label bar */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          zIndex: 10,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "white",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
              marginTop: 4,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            padding: "6px 16px",
            borderRadius: 8,
            backgroundColor: "rgba(51,92,129,0.3)",
            color: "#EBF0F7",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          MediaPlan Pro
        </div>
      </div>

      {/* Screenshot with browser frame */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 60,
          right: 60,
          bottom: 40,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
          opacity: screenshotOpacity,
          transform: `scale(${screenshotScale})`,
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            height: 36,
            backgroundColor: "#1A1D27",
            display: "flex",
            alignItems: "center",
            paddingLeft: 16,
            gap: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FF5F57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FFBD2E",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#28CA41",
            }}
          />
          <div
            style={{
              marginLeft: 16,
              flex: 1,
              height: 22,
              borderRadius: 6,
              backgroundColor: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              paddingLeft: 12,
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            localhost:5176
          </div>
        </div>

        {/* Page screenshot */}
        <div
          style={{
            overflow: "hidden",
            height: "calc(100% - 36px)",
          }}
        >
          <Img
            src={staticFile(src)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top left",
              transform: `scale(${slowZoom})`,
              transformOrigin: "top left",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
