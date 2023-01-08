import React from "react"
import { useTaskStor } from "../../store/store"
import { TaskStore } from "../../store/taskSlice"
import { TaskCard } from "./TaskCard"

interface taskCardProps {
  task: Partial<TaskStore>
}
export const CurrentTask = () => {
  let task = useTaskStor((state) => state)
  return <TaskCard task={{ ...task }}  />
}
