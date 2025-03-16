import { getQueryParams } from "./addQueryParams"

global.window = { location: { origin: "http://localhost" } } as Window &
  typeof globalThis

describe("shared/url/addQueryParams", () => {
  test("test with one param", () => {
    const params = getQueryParams({
      test: "value",
    })
    expect(params).toBe("?test=value")
  })
  test("test with multiple params", () => {
    const params = getQueryParams({
      test: "value",
      second: "2",
    })
    expect(params).toBe("?test=value&second=2")
  })
  test("test with undefined", () => {
    const params = getQueryParams({
      test: "value",
      second: undefined,
    })
    expect(params).toBe("?test=value")
  })
})
