import create from "zustand"
import { TaskStor, TimerStore } from "./vanillastore"

export const useTimerStore = create(TimerStore)
export const useTaskStor = create(TaskStor)
