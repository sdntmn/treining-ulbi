import { LoginSchema } from "../types/LoginSchema"

import { loginActions, loginReducer } from "./LoginSlice"

jest.mock("../services/LoginByUserName/loginByUserName", () => ({
  loginByUsername: {
    pending: "loginByUsername/pending",
    fulfilled: "loginByUsername/fulfilled",
    rejected: "loginByUsername/rejected",
  },
}))

describe("LoginSlice", () => {
  test("должен обработать ввод имени пользователя", () => {
    // Initial state
    const state: DeepPartial<LoginSchema> = { username: "123" }

    // Test state after action
    expect(
      loginReducer(state as LoginSchema, loginActions.setUserName("123123"))
    ).toEqual({ username: "123123" })
  })

  test("должен обработать ввод пароля", () => {
    // Initial state
    const state: DeepPartial<LoginSchema> = { password: "123" }

    // Test state after action
    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword("123123"))
    ).toEqual({ password: "123123" })
  })

  test("должен обработать пустое начальное состояние", () => {
    expect(loginReducer(undefined, loginActions.setUserName("test"))).toEqual({
      username: "test",
      password: "",
      isLoading: false,
      error: undefined,
    })
  })

  test("должен обработать состояние pending", () => {
    const state: DeepPartial<LoginSchema> = {
      error: "error",
      isLoading: false,
    }

    expect(
      loginReducer(state as LoginSchema, { type: "loginByUsername/pending" })
    ).toEqual({
      error: undefined,
      isLoading: true,
    })
  })

  test("должен обработать состояние fulfilled", () => {
    const state: DeepPartial<LoginSchema> = {
      isLoading: true,
      error: "error",
    }

    expect(
      loginReducer(state as LoginSchema, { type: "loginByUsername/fulfilled" })
    ).toEqual({
      isLoading: false,
      error: undefined,
    })
  })
})
