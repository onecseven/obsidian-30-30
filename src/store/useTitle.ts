import { useEffect } from "react"
import { seconds_to_mmss } from "../components/Shared/seconds_to_mmss"
import { useTaskStor, useTimerStore } from "./store"
export const useTitle = () => {
  let { remaining_seconds } = useTaskStor((state) => state)
  let { status } = useTimerStore((state) => state)
  useEffect(() => {
    if (status === "IDLE") {
      document.title = "30/31 - Paused"
    } else if (status === "TIMER_ACTIVE") {
      document.title = "30/31 - " + seconds_to_mmss(remaining_seconds)
    }
    return () => {
      document.title = "30/31"
    }
  }, [remaining_seconds, status])
}
