import React from "react"
import { useTaskStor } from "../../store/store"
import { seconds_to_mmss } from "../Shared/seconds_to_mmss"

export const TimerText = ({ rem = "00:00" }) => {
  let { remaining_seconds } = useTaskStor((state) => state)
  let cLen = seconds_to_mmss(remaining_seconds)

  return (
  <text
    letterSpacing="-10"
    x="210"
    y="455"
    className="timerText dark-fill fillT"
  >
    {cLen || rem}
  </text>
)}
