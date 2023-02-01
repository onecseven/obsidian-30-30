import { Pause } from "../components/Timer/Pause"
import { actions } from "./actions"

const layouts = ["CLASSIC", "MODERN"] as const

export type Layout = typeof layouts[number]

export interface MetaStore {
  dispatch: (type: string, payload?: Layout) => void
  muted: boolean
  taskSound: boolean
  clearSound: boolean
  layout: Layout
}

export const Meta_reducer = (
  state: MetaStore,
  type: string,
  payload?: Layout
): Partial<MetaStore> => {
  switch (type) {
    case actions.meta.playTaskDone: {
      return {
        taskSound: !state.taskSound,
      }
    }
    case actions.meta.playClear: {
      return {
        clearSound: !state.clearSound,
      }
    }
    case actions.meta.toggleMute: {
      return {
        muted: !state.muted,
      }
    }
    case actions.meta.setLayout: {
      if (payload && !layouts.includes(payload)) return state
      return {
        layout: payload,
      }
    }
    default:
      return state
  }
}
