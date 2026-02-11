import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, fontFamily } from "./constants";

const Orb: React.FC<{
  size: number;
  color: string;
  x: number;
  y: number;
  delay: number;
  floatSpeed?: number;
}> = ({ size, color, x, y, delay, floatSpeed = 20 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  const floatY = Math.sin(frame / floatSpeed) * 12;
  const floatX = Math.cos(frame / (floatSpeed * 1.3)) * 8;

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}, transparent)`,
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${progress}) translate(${floatX}px, ${floatY}px)`,
        opacity: progress * 0.35,
        filter: "blur(60px)",
      }}
    />
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title spring - bouncy entrance
  const titleScale = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleScale, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Decorative line wipe
  const lineWidth = spring({
    frame,
    fps,
    delay: 28,
    config: { damping: 200 },
    durationInFrames: 25,
  });

  // Tagline slide up
  const taglineProgress = spring({
    frame,
    fps,
    delay: 22,
    config: { damping: 200 },
  });
  const taglineY = interpolate(taglineProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Gradient orbs */}
      <Orb size={600} color={COLORS.accent1} x={20} y={30} delay={0} />
      <Orb
        size={450}
        color={COLORS.accent2}
        x={75}
        y={55}
        delay={5}
        floatSpeed={25}
      />
      <Orb
        size={350}
        color={COLORS.accent3}
        x={50}
        y={20}
        delay={10}
        floatSpeed={18}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 140,
            fontWeight: 900,
            color: COLORS.text,
            letterSpacing: "-0.03em",
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            lineHeight: 1,
          }}
        >
          POSTRA
        </div>

        {/* Gradient accent line */}
        <div
          style={{
            width: interpolate(lineWidth, [0, 1], [0, 140]),
            height: 3,
            background: `linear-gradient(90deg, ${COLORS.accent1}, ${COLORS.accent3})`,
            marginTop: 28,
            marginBottom: 28,
            borderRadius: 2,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: COLORS.textMuted,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            transform: `translateY(${taglineY}px)`,
            opacity: taglineProgress,
          }}
        >
          The Future of Content
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
