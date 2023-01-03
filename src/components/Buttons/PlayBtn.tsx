import React from "react"
import { useTimerStore } from "../../store/store"
import { Btn } from "./Btn"

export const StartBtn = (): ReturnType<typeof Btn> => {
  let dispatch = useTimerStore((state) => state.dispatch)
  return (
    <Btn  label="start" cb={() => dispatch("start", null)}>
    </Btn>
  )
}


export const StopBtn = () => {
  let dispatch = useTimerStore((state) => state.dispatch)
  return (
    <Btn  label="stop" cb={() => dispatch("stop", null)}>
    </Btn>
  )
}

