import { cn } from "./classNames"

describe("cn", () => {
  it("возвращает переданный класс, когда mods и additional пустые", () => {
    const result = cn("cls")
    expect(result).toBe("cls")
  })

  it("включает дополнительные классы", () => {
    const additional = ["addClass1", "addClass2"]
    const result = cn("cls", {}, additional)
    expect(result).toBe("cls addClass1 addClass2")
  })

  it("включает mods с булевыми значениями true", () => {
    const mods = { mod1: true, mod2: true }
    const result = cn("cls", mods, [])
    expect(result).toBe("cls mod1 mod2")
  })

  it("включает mods с булевым значениями true и false", () => {
    const mods = { mod1: true, mod2: false }
    const result = cn("cls", mods, [])
    expect(result).toBe("cls mod1")
  })

  it("включает mods со строковыми значениями", () => {
    const mods = { mod1: "value1", mod2: "value2" }
    const result = cn("cls", mods)
    expect(result).toBe("cls mod1 mod2")
  })

  it("включает несколько mods и дополнительные классы", () => {
    const mods = { mod1: true, mod2: false }
    const additional = ["addClass1", "addClass2"]
    const result = cn("cls", mods, additional)
    expect(result).toBe("cls addClass1 addClass2 mod1")
  })

  it("обрабатывает крайний случай: пустой cls", () => {
    const result = cn("")
    expect(result).toBe("")
  })
})
