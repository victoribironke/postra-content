import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { IntroScene } from "./IntroScene";
import { KineticScene } from "./KineticScene";
import { OutroScene } from "./OutroScene";

export const SCENE_1_DURATION = 100;
export const SCENE_2_DURATION = 100;
export const SCENE_3_DURATION = 80;
export const TRANSITION_DURATION = 15;

// TransitionSeries subtracts transition duration from total
export const TOTAL_DURATION =
  SCENE_1_DURATION +
  SCENE_2_DURATION +
  SCENE_3_DURATION -
  TRANSITION_DURATION * 2;

export const ShowcaseVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Intro with orbs and title */}
        <TransitionSeries.Sequence durationInFrames={SCENE_1_DURATION}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: Kinetic typography + counters */}
        <TransitionSeries.Sequence durationInFrames={SCENE_2_DURATION}>
          <KineticScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3: Outro with call to action */}
        <TransitionSeries.Sequence durationInFrames={SCENE_3_DURATION}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
