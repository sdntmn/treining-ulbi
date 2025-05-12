import { fireEvent, screen } from "@testing-library/react"
import React from "react"

import { ComponentRender } from "@/shared/lib/tests/ComponentRender/ComponentRender"

import { Sidebar } from "./Sidebar"

describe("Sidebar", () => {
  test("Sidebar - default", () => {
    ComponentRender(<Sidebar />)
    expect(screen.getByTestId("sidebar")).toBeInTheDocument()
  })

  test("Sidebar - toggle", () => {
    ComponentRender(<Sidebar />)
    const toggleBtn = screen.getByTestId("sidebar-toggle")
    expect(screen.getByTestId("sidebar")).toBeInTheDocument()
    fireEvent.click(toggleBtn)
    expect(screen.getByTestId("sidebar")).toHaveClass("sidebar__collapsed")
  })
})
