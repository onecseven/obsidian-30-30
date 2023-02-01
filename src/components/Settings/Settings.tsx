import React from "react"
import { useColor } from "../../store/useColor"
import { LayoutBtn, LoopBtn, VolumeBtn } from "./SettingsBtn"

interface PickerProps {
  swap: () => void
}

export const Settings = ({ swap }: PickerProps) => {
  let { light } = useColor()
  return (
    <>
      <div className="fadeIn settingsView medium-background">
        <h1 style={{ color: light }}>Settings</h1>
        <div className="innerSettings">
          <VolumeBtn />
          <LayoutBtn />
          <LoopBtn />
        </div>
      </div>
    </>
  )
}
