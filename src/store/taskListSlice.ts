import { TaskStore } from "./taskSlice"
export interface TaskListStore {
  status: "IDLE" | "TIMER_ACTIVE"
  name: string
  tasks: TaskStore[]
  looping: boolean
  timer: ReturnType<typeof setTimeout> | null
  isPlaying: boolean
  getState(): TaskStore
  dispatch: (type: string, payload: TaskListStore) => void
}

export const actions = {
  taskList: {
    setTaskList: "setTaskList",
    sendBottom: "sendBottom",
    endTasklist: "endTasklist",
    toggleLoop: "toggleLoop",
    stop: "stop",
    start: "start",
  },
  task: {
    tick: "tick",
    startTick: "startTick",
    setTask: "setTask",
  },
}

export const tasklist_reducer = (
  state: TaskListStore,
  type: string,
  payload: TaskListStore
): Partial<TaskListStore> => {
  console.log(type)
  switch (type) {
    case actions.taskList.start: {
      state.getState().dispatch(actions.task.startTick, null)
      return {
        timer: setInterval(() => {
          if (state.getState().status === "TICKING")
            state.getState().dispatch(actions.task.tick, null)
          else if (state.getState().status === "OVER")
            state.dispatch(actions.taskList.sendBottom, null)
        }, 1000),
        isPlaying: true,
        status: "TIMER_ACTIVE",
      }
    }
    case actions.taskList.stop: {
      if (state.timer) clearInterval(state.timer)
      return { timer: null, status: "IDLE" }
    }
    case actions.taskList.toggleLoop: {
      return { looping: !state.looping }
    }
    case actions.taskList.sendBottom: {
      if (state.timer) clearInterval(state.timer)
      let tasks = state.tasks.slice()
      tasks.shift()
      tasks.push({ ...state.getState() })
      state.getState().dispatch(actions.task.setTask, { ...tasks[0] })
      let next_task = tasks[0]
      if (next_task.name === "BREAK") {
        tasks.push(tasks.shift())
        if (!state.looping)
          return {
            tasks,
            status: "IDLE",
          }
      } else if (state.status === "TIMER_ACTIVE") {
        state.getState().dispatch(actions.task.startTick, null)
        return {
          timer: setInterval(() => {
            if (state.getState().status === "TICKING")
              state.getState().dispatch(actions.task.tick, null)
            else if (state.getState().status === "OVER")
              state.dispatch(actions.taskList.sendBottom, null)
          }, 1000),
          tasks,
        }
      }
      return {
        timer: null,
        tasks,
      }
    }
    case actions.taskList.setTaskList: {
      state.getState().dispatch("setTask", payload.tasks[0])
      return { ...state, ...payload }
    }
    case actions.taskList.endTasklist: {
      if (state.timer) clearInterval(state.timer)
      return {
        isPlaying: false,
      }
    }
    default:
      return state
  }
}
