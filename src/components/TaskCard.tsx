import React from "react"
import { TaskStore } from "../store/taskSlice"

interface taskCardProps {
  task: Partial<TaskStore>
  times: Date[] | null
}

function date_to_hhmmss(date: Date) {
  return date.toISOString().substr(11, 8)
}

export const TaskCard = ({ task, times }: taskCardProps) => {
  let { name, length } = task
  let [cStart, cEnd] = times
  return (
    <>
      <div>Name: {name}</div>
      <div>Length: {length}</div>
      <div>Computed Start: {date_to_hhmmss(cStart)} </div>
      <div>Computed End: {date_to_hhmmss(cEnd)} </div>
    </>
  )
}
