import { StateSchema } from "app/providers/StoreProvider"

import { getLoginUsername } from "./getLoginUsername"

describe("Тест getLoginError", () => {
  test("Вернет имя", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: "Admin",
      },
    }
    expect(getLoginUsername(state as StateSchema)).toEqual("Admin")
  })
  test("Вернет пустое имя", () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginUsername(state as StateSchema)).toEqual("")
  })
})
