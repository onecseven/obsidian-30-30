import create from "zustand/vanilla"
import { TaskStore, task_reducer } from "./taskSlice"
import { TaskListStore, tasklist_reducer } from "./taskListSlice"

export const TaskStor = create<TaskStore>()((set, get) => ({
  status: "OVER",
  id: "",
  name: "",
  length: -1,
  remaining_seconds: -1,
  start_tick: null,
  dispatch: (type: string, data: TaskStore) =>
    set((state) => task_reducer(state, type, data)),
}))

export const TimerStore = create<TaskListStore>()((set) => ({
  status: "IDLE",
  name: "",
  tasks: [],
  looping: false,
  timer: null,
  isPlaying: false,
  ...TaskStor,
  dispatch: (type: string, data: TaskListStore) =>
    set((state) => tasklist_reducer(state, type, data)),
}))
