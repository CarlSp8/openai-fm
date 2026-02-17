import React from "react";

interface PlayingWaveformProps {
  audioLoaded: boolean;
  amplitudeLevels: number[];
  animateWaveClass?: string;
}

export const PlayingWaveform = ({
  audioLoaded,
  amplitudeLevels,
  animateWaveClass = "animate-wave",
}: PlayingWaveformProps) => (
  <div className="w-[36px] h-[16px] relative left-[4px]">
    {amplitudeLevels.map((level, idx) => {
      const height = `${Math.min(Math.max(level * 30, 0.2), 1.9) * 100}%`;
      return (
        <div
          key={idx}
          className={`w-[2px] bg-white transition-all duration-150 rounded-[2px] absolute top-1/2 -translate-y-1/2 ${
            audioLoaded ? "opacity-100" : animateWaveClass
          }`}
          style={{
            height,
            animationDelay: `${idx * 0.15}s`,
            left: `${idx * 6}px`,
          }}
        />
      );
    })}
  </div>
);
