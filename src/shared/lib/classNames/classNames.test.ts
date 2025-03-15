import { cn } from "./classNames"

describe("cn", () => {
  it("возвращает переданный класс, когда mods и additional пустые", () => {
    const result = cn("cls")
    expect(result).toBe("cls")
  })

  it("включает дополнительные классы", () => {
    const additional = ["addClass1", "addClass2"]
    const result = cn("cls", additional)
    expect(result).toBe("cls addClass1 addClass2")
  })
  it("обрабатывает крайний случай: пустой cls", () => {
    const result = cn("")
    expect(result).toBe("")
  })
})
