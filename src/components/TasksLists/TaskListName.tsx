import React from "react"
import { useTimerStore } from "../../store/store"
export const TaskListName = () => {
  let label = useTimerStore((state) => state.name)
  return (
    <div className="tName medium-background bgT ">
      <span className="light-color cT"> {label.slice(0,12)}</span>
    </div>
  )
}
