import React from "react"
import { ActiveCircle } from "./ActiveCircle"
import { BGCircle } from "./BGCircle"
import { TimerText } from "./TimerText"
import { Playback } from "./Playback"
import { TatiTimerButtons } from "./TatiTimerButtons"
import { useSettingsStore } from "../../store/store"
import { ClassicTimerButtons } from "./ClassicTimerButtons"

export const Timer = () => {
  let layout = useSettingsStore((state) => state.layout)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="650"
      height="650"
      className="timerCircle"
    >
      <BGCircle />
      <ActiveCircle />
      <Playback />
      <TimerText />
      {layout === "CLASSIC" && <ClassicTimerButtons />}
      {layout === "MODERN" && <TatiTimerButtons />}
    </svg>
  )
}
