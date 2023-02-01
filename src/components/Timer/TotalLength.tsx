import React from "react"
import { useTimerStore, useTaskStor } from "../../store/store"
import { ClockIcon } from "../Shared/icons/ClockIcon"

export function seconds_to_hhmmss(num: number) {
  return new Date(num * 1000).toISOString().substr(11, 8)
}

export const TotalLength = () => {
  let { remaining_seconds, id } = useTaskStor((state) => state)
  let length = useTimerStore((state) =>
    state.tasks
      .slice(0, state.tasks.map((task) => task.name).indexOf("_BREAK"))
      .filter((task) => task.id !== id)
      .map((task) => task.length)
      .reduce((prev, curr) => prev + curr, 0)
  )
  let hhmmss = seconds_to_hhmmss(length + remaining_seconds)

  return (
    <div  className="topBar">
      <ClockIcon x="100" y="150"/>
      <div className="totalLength medium-color">{hhmmss}</div>
    </div>
  )
}
