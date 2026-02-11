import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, fontFamily } from "./constants";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gradient background reveal
  const gradientProgress = spring({
    frame,
    fps,
    delay: 0,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  // Main title entrance
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 15, stiffness: 100 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 0.6], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle entrance
  const subtitleProgress = spring({
    frame,
    fps,
    delay: 18,
    config: { damping: 200 },
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [20, 0]);

  // Decorative ring
  const ringProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
    durationInFrames: 40,
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.5, 1]);
  const ringRotation = interpolate(frame, [0, 80], [0, 45]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${COLORS.accent1}25, ${COLORS.accent2}15, ${COLORS.accent3}25)`,
          opacity: gradientProgress,
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent2}35, transparent)`,
          transform: `translate(-50%, -50%) scale(${gradientProgress})`,
          filter: "blur(80px)",
        }}
      />

      {/* Decorative rotating ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          border: `1px solid ${COLORS.accent2}30`,
          transform: `translate(-50%, -50%) scale(${ringScale}) rotate(${ringRotation}deg)`,
          opacity: ringProgress * 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          border: `1px solid ${COLORS.accent1}20`,
          transform: `translate(-50%, -50%) scale(${ringScale}) rotate(${-ringRotation * 0.7}deg)`,
          opacity: ringProgress * 0.3,
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: COLORS.text,
            letterSpacing: "-0.02em",
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            textAlign: "center",
          }}
        >
          See the potential?
        </div>

        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: COLORS.textMuted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: 28,
            transform: `translateY(${subtitleY}px)`,
            opacity: subtitleProgress,
            textAlign: "center",
          }}
        >
          Every frame, crafted by code
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
