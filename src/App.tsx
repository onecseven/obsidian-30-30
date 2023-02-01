import React, { useState, useCallback, useEffect } from "react"
import { Picker } from "./components/Picker/Picker"
import { Settings } from "./components/Settings/Settings"
import { TimerView } from "./components/TimerView"
import { TopBar } from "./components/TopBar"
import { useColor } from "./store/useColor"
import { useTitle } from "./store/useTitle"
import { useAudio } from "./store/useAudio"

const view_types = ["TIMER", "PICKER", "SETTINGS"] as const

export type Views = typeof view_types[number]

export const App = () => {
  useColor()
  useTitle()
  useAudio()

  const [currentView, setCurrentView] = useState<Views>("TIMER")

  const setView = (view: Views) => () => {
    if (currentView === view) setCurrentView("TIMER")
    else setCurrentView(view)
  }

  return (
    <div className="App" id="App">
      <TopBar swap={setView} />
      {currentView === "TIMER" && <TimerView />}
      {currentView === "PICKER" && <Picker swap={setView("TIMER")} />}
      {currentView === "SETTINGS" && <Settings swap={setView("SETTINGS")} />}
    </div>
  )
}

export default App
