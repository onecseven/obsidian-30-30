import React from "react"
import ReactDOM from "react-dom"
import App from "./App.jsx"
import data, { second } from "./data"
import "./App.css"
import { TimerStore, PickerStor } from "./store/vanillastore"

const render_tasklist = (taskList) => {
  TimerStore.getState().dispatch("setTaskList", taskList)
  PickerStor.getState().dispatch("set", [taskList])

  const body = document.getElementsByTagName("BODY")[0]
  body.id = "root"
  ReactDOM.render(<App />, body)
}


TimerStore.getState().dispatch("setTaskList", data)
PickerStor.getState().dispatch("set", [data, second])

const body = document.getElementsByTagName("BODY")[0]
body.id = "root"

ReactDOM.render(<App />, body)


