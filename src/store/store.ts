import create from "zustand"
import { TimerStore } from "./vanillastore"

export const useTimerStore = create(TimerStore)
