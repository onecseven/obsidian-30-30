import React from "react"
import { useTimerStore, useTaskStor } from "../../store/store"
import { TimerBtn } from "./TimerButtons"
import { SendToBottomIcon } from "../Shared/icons/SendToBottomIcon"
import { BtnLabel } from "./BtnLabel"


let labelMaker = (seconds: number) => {
  let min = 1
  if (seconds > 7200) min = 30
  else if (seconds > 3600) min = 15
  else if (seconds > 600) min = 5
  return min
}

export const TatiTimerButtons = () => {
  let { dispatch } = useTimerStore((state) => state)
  let taskDispatch = useTaskStor((state) => state.dispatch)
  let remaining = useTaskStor((state) => state.remaining_seconds)
  let send_to_bottom = () => dispatch("sendBottom", "preserve")
  let add = () => taskDispatch("add", null)
  let take = () => taskDispatch("take", null)
  let label = labelMaker(remaining)

  return (
    <>

      {/* <TimerBtn pos="topLeft" cb={add}>
        <BtnLabel x="122" y="155" label={`-${label}m`}/>
      </TimerBtn>

      <TimerBtn pos="topRight" cb={take}>
        <BtnLabel label={`+${label}m`} x="445" y="155" />
      </TimerBtn>  */}
      {/* <TimerBtn pos="bottomLeft" cb={add}>
        <BtnLabel x="48" y="416" label={`-${label}m`}/>
      </TimerBtn>

      <TimerBtn pos="bottomRight" cb={take}>
        <BtnLabel label={`+${label}m`} x="525" y="416" />
      </TimerBtn> */}
 
      <TimerBtn pos="midLeft" cb={add}>
        <BtnLabel x="48" y="262" label={`-${label}m`}/>
      </TimerBtn>

      <TimerBtn pos="midRight" cb={take}>
        <BtnLabel label={`+${label}m`} x="522" y="262" />
      </TimerBtn>
 
      <TimerBtn pos="bottom" cb={send_to_bottom}>
        <SendToBottomIcon x="284" y="534" />
      </TimerBtn>
      {/* <TimerBtn pos="top" cb={send_to_bottom}>
        <SendToBottomIcon x="284" y="34" />
      </TimerBtn> */}

    </>
  )
}