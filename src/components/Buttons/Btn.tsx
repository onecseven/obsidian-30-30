import React from "react"

interface btnProps {
  label: string
  cb: () => void
}

export const Btn = ({cb, label}: btnProps)  => {
  return (
    <button onClick={cb}>
      {label}
    </button>
  )
}
