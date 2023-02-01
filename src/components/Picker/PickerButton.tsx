import React from "react"
import { FolderIcon } from "../Shared/icons/FolderIcon"

interface PickerButtonProps {
  setView: () => void
}

export const PickerButton = ({setView}: PickerButtonProps) => {
  return (
    <div  className="medium-background pickerBtn" onClick={setView}>
      <FolderIcon x="10" y="10"/>
    </div>
  )
}
