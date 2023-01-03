import React from "react"
import { useTaskStor } from "../store/store"

export const CurrentTask = () => {
  let { name, remaining_seconds, status} = useTaskStor((state) => state)
  return (
    <>
      <div>CurrentTask: {name} </div>
      <div>Status: {status} </div>
      <div>Remaining Length: {remaining_seconds}</div>
    </>
  )
}
