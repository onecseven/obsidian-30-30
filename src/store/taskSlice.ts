const actions = {
  task: {
    tick: "tick",
    startTick: "startTick",
    setTask: "setTask",
    pause: "pause"
  },
}

export const task_reducer = (
  state: TaskStore,
  type: string,
  payload: TaskStore
): Partial<TaskStore> => {
  console.log(type, state)
  switch (type) {
    case actions.task.setTask: {
      return {
        ...state,
        ...payload,
      }
    }
    case actions.task.pause: {
      return {
        ...state,
        status: "OVER"
      }
    }
    case actions.task.startTick: {
      return { status: "TICKING", start_tick: new Date()}
    }
    case actions.task.tick: {
      if (state.remaining_seconds - 2 <= 0) {
        return {
          status: "OVER",
          remaining_seconds: state.remaining_seconds - 1,
        }
      } else {
        return {
          status: "TICKING",
          remaining_seconds: state.remaining_seconds - 1,
        }
      }
    }
    default:
      return state
  }
}

export interface TaskStore {
  status: "TICKING" | "OVER"
  id: string
  name: string
  length: number
  remaining_seconds: number
  start_tick: Date | null
  dispatch: (type: string, data: Partial<TaskStore> | null) => void
}
