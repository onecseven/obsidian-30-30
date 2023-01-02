import { TaskList } from "src/primitives"
import create from "zustand/vanilla"

export const actions = {
  taskList: { 
    setTaskList: "setTaskList",
    sendBottom: "sendBottom",
    end_tasklist: "endTasklist",
    toggle_loop: "toggle_loop",
    stop: "stop",
    start: "start",
  },
  task: {
    tick: "tick",
    setTask: "setTask"
  }
}


const task_reducer = (state: TaskStore , type: string, payload: TaskStore) => {
  switch (type) {
    // case actions.tick:
  }
}


interface TaskListStore {
  name: string
  tasks: TaskStore[]
  looping: boolean
  timer: ReturnType<typeof setTimeout> | null
  isPlaying: boolean
}
interface TaskStore {
  id: string
  name: string
  length: number
  remaining_seconds: number
}

export const TaskStore = create<TaskStore>()((set) => ({
  id: "",
  name: "",
  length: -1,
  remaining_seconds: -1,
}))

export const TaskListStore = create<TaskListStore>()((set) => ({
  name: "",
  tasks: [],
  looping: false,
  timer: null,
  isPlaying: false,
  ...TaskStore,
}))
