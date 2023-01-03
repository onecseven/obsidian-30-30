import { useTimerStore } from "../../store/store"
import React from "react"
import { Btn } from "./Btn"

export const SendToBottom = () => {
  let dispatch = useTimerStore((state) => state.dispatch)
  return (
      <Btn cb={() => dispatch("sendBottom", "preserve")} label="send bottom"></Btn>
  )
}
export const DoneBtn = () => {
  let dispatch = useTimerStore((state) => state.dispatch)
  return (
      <Btn cb={() => dispatch("sendBottom", null)} label="task done"></Btn>
  )
}

export const LoopBtn = () => {
  let dispatch = useTimerStore((state) => state.dispatch)
  return (
      <Btn cb={() => dispatch("toggleLoop", null)} label={"toggle loop"}></Btn>
  )
}