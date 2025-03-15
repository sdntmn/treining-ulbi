import { render, screen } from "@testing-library/react"

import { Button, ButtonVar } from "./Button"

describe("Button", () => {
  test("рендерит кнопку с текстом", () => {
    render(<Button>TEST</Button>)
    expect(screen.getByText("TEST")).toBeInTheDocument()
  })

  test("применяет стили для варианта clear", () => {
    render(<Button buttonVar={ButtonVar.CLEAR}>TEST</Button>)
    expect(screen.getByText("TEST")).toHaveClass("clear")
  })

  test("обрабатывает клик", () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>TEST</Button>)

    screen.getByText("TEST").click()
    expect(onClick).toHaveBeenCalled()
  })

  test("отключается при disabled=true", () => {
    render(<Button disabled>TEST</Button>)
    expect(screen.getByText("TEST")).toBeDisabled()
  })
})
