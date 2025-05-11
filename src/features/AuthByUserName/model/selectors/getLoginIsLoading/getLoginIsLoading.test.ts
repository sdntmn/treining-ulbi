import { StateSchema } from "@/app/providers/StoreProvider"

import { getLoginIsLoading } from "./getLoginIsLoading"

describe("Тест getLoginError", () => {
  test("Возвращает загрузку", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true,
      },
    }
    expect(getLoginIsLoading(state as StateSchema)).toEqual(true)
  })
  test("Возвращает пустой стайт", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {},
    }
    expect(getLoginIsLoading(state as StateSchema)).toEqual(false)
  })
})
