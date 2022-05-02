import React, { ReactElement } from "react"

interface Props {}

export default function Header({}: Props): ReactElement {
  return (
    <div className="Header">
      <h2>CONSUMER INFORMATION</h2>
    </div>
  )
}
