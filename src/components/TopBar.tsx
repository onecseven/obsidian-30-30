import React from "react"
import { Views } from "../App"
import { PickerButton } from "./Picker/PickerButton"
import { GearIcon } from "./Shared/icons/GearIcon"
import { TaskListName } from "./TasksLists/TaskListName"

interface TopBarProps {
  swap: (p: Views) => () => void
}
interface SettingsButtonProps {
  setView: () => void
}

const SettingsButton = ({ setView }: SettingsButtonProps) => (
  <div className="medium-background settingsBtn" onClick={setView}>
    <GearIcon x="0" y="0" />
  </div>
)

export const TopBar = ({ swap }: TopBarProps) => (
  <div className="topBar">
    <PickerButton setView={swap("PICKER")} />
    <TaskListName />
    <SettingsButton setView={swap("SETTINGS")} />
  </div>
)
