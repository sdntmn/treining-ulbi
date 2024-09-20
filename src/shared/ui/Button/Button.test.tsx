import { render, screen } from "@testing-library/react"

import { Button, ButtonVar } from "./Button"

describe("Button", () => {
  test("Button тест рендер - только текст кнопки", () => {
    render(<Button>TEST</Button>)

    expect(screen.getByText("TEST")).toBeInTheDocument()
  })

  test("Button параметр buttonVar - clear", () => {
    render(<Button buttonVar={ButtonVar.CLEAR}>TEST</Button>)

    expect(screen.getByText("TEST")).toHaveClass("clear")

    screen.debug()
  })
})
