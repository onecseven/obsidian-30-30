import moment from "moment"
import React from "react"
import { TaskStore } from "../../store/taskSlice"
import { SVGCard } from "./SVGCard"

interface taskCardProps {
  task: Partial<TaskStore>
}

function seconds_to_mmss(num: number) {
  return new Date(num * 1000).toISOString().substr(14, 5)
}

export const TaskCard = ({ task }: taskCardProps) => {
  let { name, remaining_seconds, computed } = task
  if (!computed)
    computed = [
      moment().startOf("day"),
      moment().startOf("day").add(task.remaining_seconds, "seconds"),
    ]
  let [cStart, cEnd] = computed
  let cLen = seconds_to_mmss(remaining_seconds)
  return (
    <SVGCard
      name={name}
      length={cLen}
      cStart={cStart.format("HH:mm:ss")}
      cEnd={cEnd.format("HH:mm:ss")}
    />
  )
}
