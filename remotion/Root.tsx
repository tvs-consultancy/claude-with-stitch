import React from "react";
import { Composition } from "remotion";
import { Walkthrough } from "./Walkthrough";

// Total duration: title(90) + 4*page(150) + outro(90) - 5*transition(15) = 705 frames
// At 30fps = ~23.5 seconds
const TOTAL_FRAMES = 705;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Walkthrough"
        component={Walkthrough}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
