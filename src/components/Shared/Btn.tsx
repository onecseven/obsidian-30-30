import * as React from "react"
import { useColor} from "../../store/useColor"

interface btnProps {
  label: string
  cb: () => void
}

export const Btn = ({ cb, label }: btnProps) => {
  return <button onClick={cb}>{label}</button>
}

export interface SVGBtnProps {
  x: number
  y: number
  className?: string
  color?: string
  cb?: () => void
  children?: React.ReactNode
}
// { cb, label }: btnProps
export const SvgBtn = ({
  x,
  y,
  className = "",
  cb,
  children = null,
}: SVGBtnProps) => {
  useColor()
  return (
    <>
      {children}

      <circle
        fill="transparent"
        stroke="transparent"
        className="light-stroke circle "
        r="62.5"
        cx={x}
        cy={y}
        strokeWidth="8"
        onClick={cb}
      ></circle>
    </>
  )
}
