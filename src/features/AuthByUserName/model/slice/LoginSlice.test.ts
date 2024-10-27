import { LoginSchema } from "../types/LoginSchema"
import { loginActions, loginReducer } from "./LoginSlice"

describe("Тест loginSlice", () => {
  test("Тест ввода имени", () => {
    const state: DeepPartial<LoginSchema> = { username: "123" }
    expect(
      loginReducer(state as LoginSchema, loginActions.setUserName("123123"))
    ).toEqual({ username: "123123" })
  })

  test("Тест ввода пароля", () => {
    const state: DeepPartial<LoginSchema> = { password: "123" }
    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword("123123"))
    ).toEqual({ password: "123123" })
  })
})
