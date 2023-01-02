import create from "zustand"
import { TaskListStore } from "./vanillaStore"

export const useTimerStore = create(TaskListStore)
