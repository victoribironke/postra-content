import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export const COLORS = {
  bg: "#0a0a0a",
  accent1: "#6366f1",
  accent2: "#8b5cf6",
  accent3: "#ec4899",
  text: "#ffffff",
  textMuted: "#a1a1aa",
};
