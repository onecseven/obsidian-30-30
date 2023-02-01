import { TaskList } from "../data"
import { actions } from "./actions"
import { TimerStore } from "./vanillastore"

export interface PickerStore {
  taskLists: TaskList[]
  dispatch: (type: string, data: TaskList["id"] | TaskList[] | null) => void
}

export const picker_reducer = (
  state: PickerStore,
  type: string,
  payload: TaskList["id"] | TaskList[] | null
): Partial<PickerStore> => {
  switch (type) {
    case actions.picker.select: {
      if (!payload || typeof payload !== "string") return state
      else {
        let selected = state.taskLists.find((store) => store.id === payload) 
        if (selected) TimerStore.getState().dispatch(actions.taskList.setTaskList, selected)
      }
      return state
    }
    case actions.picker.set: {
      if (!payload || !Array.isArray(payload) ) return state
      return {
        taskLists: state.taskLists.concat(payload)
      }
    }
    default:
      return state
  }
}
