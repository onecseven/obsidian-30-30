import React from "react"
import { useSettingsStore, useTimerStore } from "../../store/store"
import { useColor } from "../../store/useColor"
import { LoopIcon, NoLoopIcon } from "../Shared/icons/LoopIcon"
import { NoVolumeIcon, VolumeIcon } from "../Shared/icons/VolumeIcon"
import { BtnLabel, BtnLabelColorAware } from "../Timer/BtnLabel"

export const VolumeBtn = () => {
  let {muted, dispatch} = useSettingsStore(state => state)
  let toggle = () => dispatch("toggleMute")
  return (
    <div className="fadeIn dark-background pickerBtn settings" onClick={toggle}>
      {muted ? <NoVolumeIcon x="10" y="10"/> : <VolumeIcon x="10" y="10" /> }
    </div>
  )
}

const MODERN = () => <BtnLabelColorAware label="MODERN" x="9" y="50" size="25" />
const CLASSIC = () => <BtnLabelColorAware label="CLASSIC" x="9" y="50" size="25" />

export const LayoutBtn = () => {
  let {layout, dispatch} = useSettingsStore(state => state)
  let setModern = () => dispatch("setLayout", "MODERN")
  let setClassic = () => dispatch("setLayout", "CLASSIC")
  let toggle = () => {
    if (layout === "MODERN") setClassic()
    else if (layout === "CLASSIC") setModern() 
  }
  return (
    <div className="fadeIn dark-background pickerBtn settings" onClick={toggle}>
      <svg>
        {layout === "CLASSIC" && <CLASSIC/>}
        {layout === "MODERN" && <MODERN/>}
      </svg>
    </div>
  )
}
export const LoopBtn = () => {
  let {dispatch, looping} = useTimerStore(state => state)
  let toggleLoop = () => dispatch("toggleLoop", null)
  return (
    <div className="fadeIn dark-background pickerBtn settings" onClick={toggleLoop}>
      <svg>
        {looping ? <NoLoopIcon x="15" y="6"/> :  <LoopIcon x="15" y="6" /> }
      </svg>
    </div>
  )
}
