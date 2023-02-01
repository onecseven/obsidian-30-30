import React from "react"
import { useTimerStore } from "../../store/store"
import { Pause } from "./Pause"
import { Triangle } from "./Triangle"

export const Playback = () => {
  let { status, dispatch } = useTimerStore((state) => state)
  let isPlaying = status === "TIMER_ACTIVE"
  let play = () => dispatch("start", null)
  let stop = () => dispatch("stop", null)

  return <>{isPlaying ? <Pause cb={stop} /> : <Triangle cb={play} />}</>
}
