import { StateSchema } from "app/providers/StoreProvider"

import { getLoginPassword } from "./getLoginPassword"

describe("Тест getLoginError", () => {
  test("Вернет пароль", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: "123123",
      },
    }
    expect(getLoginPassword(state as StateSchema)).toEqual("123123")
  })
  test("Вернет пустой пароль", () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginPassword(state as StateSchema)).toEqual("")
  })
})
