import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { TitleCard } from "./TitleCard";
import { PageScene } from "./PageScene";
import { OutroCard } from "./OutroCard";

const TRANSITION_DURATION = 15;

const pages = [
  {
    src: "assets/dashboard.png",
    title: "Dashboard",
    subtitle: "Campaign overview, budget metrics, and quick actions",
  },
  {
    src: "assets/chat.png",
    title: "AI Chat",
    subtitle: "Multi-conversation planning assistant with mock AI responses",
  },
  {
    src: "assets/files.png",
    title: "File Management",
    subtitle: "Drag-and-drop upload with progress tracking",
  },
  {
    src: "assets/plans.png",
    title: "Media Plans",
    subtitle: "Filterable table and card views with status tracking",
  },
] as const;

export const Walkthrough: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Title card — 3s */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <TitleCard />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Dashboard */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <PageScene
          src={pages[0].src}
          title={pages[0].title}
          subtitle={pages[0].subtitle}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Chat */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <PageScene
          src={pages[1].src}
          title={pages[1].title}
          subtitle={pages[1].subtitle}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Files */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <PageScene
          src={pages[2].src}
          title={pages[2].title}
          subtitle={pages[2].subtitle}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Media Plans */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <PageScene
          src={pages[3].src}
          title={pages[3].title}
          subtitle={pages[3].subtitle}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Outro card — 3s */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <OutroCard />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
