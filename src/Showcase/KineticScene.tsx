import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, fontFamily } from "./constants";

const WORDS = [
  { text: "Design.", color: COLORS.accent1, delay: 5 },
  { text: "Animate.", color: COLORS.accent2, delay: 20 },
  { text: "Deliver.", color: COLORS.accent3, delay: 35 },
];

const AnimatedWord: React.FC<{
  text: string;
  color: string;
  delay: number;
}> = ({ text, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Word entrance - bouncy spring
  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 15, stiffness: 120 },
  });

  const y = interpolate(progress, [0, 1], [60, 0]);
  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Underline wipe after word lands
  const underlineProgress = spring({
    frame,
    fps,
    delay: delay + 10,
    config: { damping: 200 },
    durationInFrames: 20,
  });

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        marginRight: 30,
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <span
        style={{
          fontSize: 100,
          fontWeight: 900,
          color: COLORS.text,
          letterSpacing: "-0.02em",
        }}
      >
        {text}
      </span>
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 0,
          height: 6,
          width: `${underlineProgress * 100}%`,
          background: color,
          borderRadius: 3,
        }}
      />
    </div>
  );
};

const Counter: React.FC<{
  target: number;
  suffix: string;
  label: string;
  delay: number;
  x: number;
}> = ({ target, suffix, label, delay, x }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  const value = Math.round(interpolate(progress, [0, 1], [0, target]));
  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const yOffset = interpolate(progress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: `${x}%`,
        transform: `translateX(-50%) translateY(${yOffset}px)`,
        opacity,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: COLORS.text,
        }}
      >
        {value}
        {suffix}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: COLORS.textMuted,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const KineticScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent2}18, transparent)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(80px)",
        }}
      />

      {/* Kinetic words */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          whiteSpace: "nowrap",
        }}
      >
        {WORDS.map((word) => (
          <AnimatedWord key={word.text} {...word} />
        ))}
      </div>

      {/* Animated counters at the bottom */}
      <Counter
        target={60}
        suffix=" fps"
        label="Smooth Motion"
        delay={50}
        x={25}
      />
      <Counter
        target={4}
        suffix="K"
        label="Resolution"
        delay={55}
        x={50}
      />
      <Counter
        target={100}
        suffix="%"
        label="Code-Driven"
        delay={60}
        x={75}
      />
    </AbsoluteFill>
  );
};
