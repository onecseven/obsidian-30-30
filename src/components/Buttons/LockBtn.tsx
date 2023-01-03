import { useTimerStore } from "../../store/store"
import React from "react"
import { Btn } from "./Btn"

export const Lock = () => {
  return <Btn cb={() => console.log("gotta lock")} label="lock"></Btn>
}
