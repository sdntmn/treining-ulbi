import { StateSchema } from "app/providers/StoreProvider"

import { getLoginError } from "./getLoginError"

describe("Тест getLoginError", () => {
  test("Возвращает ошибку", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: "error",
      },
    }
    expect(getLoginError(state as StateSchema)).toEqual("error")
  })
  test("Стайт пустой", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {},
    }
    expect(getLoginError(state as StateSchema)).toEqual(undefined)
  })
})
