import moment from "moment"
import React from "react"
import { TaskStore } from "../store/taskSlice"

interface taskCardProps {
  task: Partial<TaskStore>
}


function seconds_to_mmss(num: number) {
  return new Date(num*1000).toISOString().substr(14,5)
}

export const TaskCard = ({ task }: taskCardProps) => {
  let { name, remaining_seconds, computed } = task
  if (!computed) computed = [moment().startOf("day"), moment().startOf("day").add(task.remaining_seconds, "seconds")]
  let [cStart, cEnd] = computed
  return (
    <div className="taskCard">
      <div className="icon"></div>
      <div className="taskName">{name}</div>
      <div className="length">{seconds_to_mmss(remaining_seconds)}</div>
      <div className="cTimes">{cStart.format("HH:mm:ss") + " -> " + cEnd.format("HH:mm:ss")}</div>
    </div>
  )
}
