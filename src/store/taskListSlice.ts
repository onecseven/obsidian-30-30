import { TaskStore } from "./taskSlice"
export interface TaskListStore {
  status: "IDLE" | "TIMER_ACTIVE"
  name: string
  tasks: TaskStore[]
  looping: boolean
  timer: ReturnType<typeof setTimeout> | null
  isPlaying: boolean
  getState(): TaskStore
  dispatch: (type: string, payload: TaskListStore | string) => void
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
    pause: "pause",
  },
}

let compute_times = (state: TaskListStore): TaskListStore["tasks"] => {
  let [_, start] = state.getState().computed
  let ends = [{ ...state.getState() }]

  state.tasks.slice(1).forEach((task) => {
    let [cStart, cEnd] = [
      start.clone(),
      start.clone().add(task.remaining_seconds, "seconds"),
    ]
    ends.push({ ...task, computed: [cStart, cEnd] })
    start = cEnd.clone()
  })
  return ends
}

let set_timer = (state: TaskListStore) =>
  setInterval(() => {
    if (state.getState().status === "TICKING")
      state.getState().dispatch(actions.task.tick, null)
    else if (state.getState().status === "OVER")
      state.dispatch(actions.taskList.sendBottom, null)
  }, 1000)

const start_timer = (state): Partial<TaskListStore> => {
  state.getState().dispatch(actions.task.startTick, null)
  return {
    timer: set_timer(state),
    isPlaying: true,
    status: "TIMER_ACTIVE",
    tasks: compute_times(state),
  }
}

export const tasklist_reducer = (
  state: TaskListStore,
  type: string,
  payload: TaskListStore | "preserve"
): Partial<TaskListStore> => {
  console.log(type)
  switch (type) {
    case actions.taskList.start: {
      if (state.status === "TIMER_ACTIVE") return state
      return start_timer(state)
    }
    case actions.taskList.stop: {
      if (state.timer) clearInterval(state.timer)
      state.getState().dispatch(actions.task.pause, null)
      return {
        timer: null,
        status: "IDLE",
        tasks: state.tasks.map((task) => ({ ...task, computed: null })),
      }
    }
    case actions.taskList.toggleLoop: {
      return { looping: !state.looping }
    }
    case actions.taskList.sendBottom: {
      /* Clear timer, get inner dispatch, make new tasks array*/
      if (state.timer) clearInterval(state.timer)
      let taskDispatch = state.getState().dispatch
      let tasks = state.tasks.slice(1)
      /* Depending on how the action was called we need to move the finished task differenly */
      if (payload === "preserve") tasks.push({ ...state.getState() })
      else
        tasks.push({
          ...state.getState(),
          remaining_seconds: state.getState().length,
        })

      /* change the current task to the new front of the queue */
      taskDispatch(actions.task.setTask, { ...tasks[0] })

      /* if the current task is "BREAK", we have to push that to the back and set a new current task
      and if the timer isn't looping, then we should transition to "IDLE"*/
      if (tasks[0].name === "BREAK") {
        tasks.push(tasks.shift())
        taskDispatch(actions.task.setTask, { ...tasks[0] })

        if (!state.looping) {
          taskDispatch(actions.task.pause, null)
          return {
            tasks: tasks.map((task) => ({ ...task, computed: null })),
            status: "IDLE",
          }
        }
      }
      if (state.status === "TIMER_ACTIVE")
        return { ...start_timer({ ...state, tasks }) }

      /* handles calls when the timer is off */
      return {
        timer: null,
        tasks: tasks.map((task) => ({ ...task, computed: null })),
      }
    }

    case actions.taskList.setTaskList: {
      if (!payload || typeof payload === "string") return state
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
