//@ts-nocheck
import { useEffect } from "react"
import { Color } from "../data"
import { colorStrings } from "./colorStrings"
import { useTaskStor } from "./store"

type cssColor = {
  light: string
  medium: string
  dark: string
  name: Color
}

export const useColor = (): cssColor => {
  const color = useTaskStor((state) => state.color)
  const { light, dark, medium } = colorStrings[color]
  useEffect(() => {
    for (let icon of document.getElementsByClassName("light-stroke")) {
      icon.style = ` stroke: ${light};`
    }
    for (let icon of document.querySelectorAll("div.workspace-leaf-content[data-type='30/31']")) {
      icon.style = `background-color: ${light};transition: background-color 0.325s linear`
    }
    for (let icon of document.getElementsByClassName("light-fill-stroke")) {
      icon.style = `transition: fill 0.325s linear, stroke 0.325s linear;fill:${light};stroke-width:35.3357;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1; stroke: ${light};`
    }
    for (let icon of document.getElementsByClassName("light-stroke")) {
      icon.style = ` stroke: ${light};`
    }
    for (let icon of document.getElementsByClassName("stubborn")) {
      icon.style = `fill:transparent;fill-opacity:0;stroke-width:35.3357;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1; stroke: ${light};`
    }
    for (let icon of document.getElementsByClassName("light-fill")) {
      icon.style = `transition: fill 0.325s linear;fill: ${light};`
    }
    for (let icon of document.getElementsByClassName("light-background")) {
      icon.style = `background: ${light};`
    }
    for (let icon of document.getElementsByClassName("light-color")) {
      icon.style = `color: ${light};`
    }
    for (let icon of document.getElementsByClassName("medium-background")) {
      icon.style = `background: ${medium}; color: ${light}`
    }
    for (let icon of document.getElementsByClassName("medium-stroke")) {
      icon.style = `stroke: ${medium};`
    }
    for (let icon of document.getElementsByClassName("medium-fill")) {
      icon.style = `fill: ${medium};`
    }
    for (let icon of document.getElementsByClassName("medium-color")) {
      icon.style = `color: ${medium};`
    }
    for (let icon of document.getElementsByClassName("dark-fill")) {
      icon.style = `fill: ${dark};`
    }
    for (let icon of document.getElementsByClassName("dark-stroke")) {
      icon.style = `stroke: ${dark};`
    }
    for (let icon of document.getElementsByClassName("dark-background")) {
      icon.style = `background: ${dark}; color: ${light}`
    }
    return () => {}
  }, [color])

  return { ...colorStrings[color], name: color }
}
