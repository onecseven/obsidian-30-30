import React from "react"
import { ListIcon } from "../Shared/icons/ListIcon"

interface PickerCardProps {
  name: string
  onClick: () => void
}

export const PickerCard = ({ name, onClick }: PickerCardProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 138 38"
      xmlSpace="preserve"
      width="450"
      className="svgTaskCard"
      onClick={onClick}
      transform="scale(0.77)"
    >
      <g>
        <path
          className="dark-fill fillT"
          strokeWidth="0.265"
          d="M3.532 9.05v19.426c.758 2.18 1.973 4.14 5.496 4.985l121.881-.226c2.946-.65 4.572-2.51 5.205-5.278l.073-19.16c-.494-2.822-2.342-4.415-4.953-5.313L9.051 3.412c-3.263.646-5.148 2.486-5.519 5.638z"
        ></path>
      </g>
      <PickerLabel name={name} />
      <ListIcon x="8" y="10" />
    </svg>
  )
}

const PickerLabel = ({
  name = "<unnamed tasklist>",
}: Partial<PickerCardProps>) => {
  return (
    <text
      x="28"
      y="24"
      className="light-fill fillT"
      strokeWidth="0.265"
      fontSize="16.933"
      xmlSpace="preserve"
    >
      <tspan x="28" y="24.5" strokeWidth="0.265" fontSize="20">
        {name}
      </tspan>
    </text>
  )
}
