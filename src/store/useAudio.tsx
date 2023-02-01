import React, { useEffect, useMemo } from "react"
import { useSettingsStore } from "./store"
let taskSoundUrl = "https://tatiana.moe/assets/task_done.mp3"
let listSoundUrl = "https://tatiana.moe/assets/clear.mp3"


export const useGenericAudio = (url: string, isPlaying: boolean, toggle: () =>  void, muted: boolean) => {
  const audio = useMemo(() => new Audio(url), [url])
  useEffect(() => {
    (isPlaying && !muted) ? audio.play() : audio.pause()
  }, [isPlaying, muted])
  useEffect(() => {
    audio.addEventListener("ended", toggle)
    return () => {
      audio.removeEventListener("ended", toggle)
    }
  }, [])
}

export const useAudio = () => {
  const { taskSound, clearSound, dispatch, muted } = useSettingsStore(
    (state) => state
  )
  useGenericAudio(taskSoundUrl, taskSound, () => dispatch("playTaskDone"), muted)
  useGenericAudio(listSoundUrl, clearSound, () => dispatch("playClear"), muted)
}
