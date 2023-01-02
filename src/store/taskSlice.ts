const actions = {
  task: {
    tick: "tick",
    startTick: "startTick",
    setTask: "setTask",
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
    case actions.task.startTick: {
      return { status: "TICKING" }
    }
    case actions.task.tick: {
      if (state.remaining_seconds - 1 === 0) {
        console.log("over")
        return { status: "OVER", remaining_seconds: state.length }
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
  dispatch: (type: string, data: TaskStore | null) => void
}
