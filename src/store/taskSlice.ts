import moment from 'moment';

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
        computed: null,
        status: "OVER"
      }
    }
    case actions.task.startTick: {
      let start = moment([])
      return { status: "TICKING", 
              start_tick: start,
              computed: [start, start.clone().add(state.remaining_seconds, "seconds")]
            }
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
  computed: [moment.Moment, moment.Moment] | null
  id: string
  name: string
  length: number
  remaining_seconds: number
  start_tick: moment.Moment | null
  dispatch: (type: string, data: Partial<TaskStore> | null) => void
}
