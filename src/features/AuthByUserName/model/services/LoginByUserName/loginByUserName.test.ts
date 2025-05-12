import { userActions } from "../../../../../entities/User"
import { TestAsyncThunk } from "../../../../../shared/lib/tests/TestAsyncThunk/TestAsyncThunk"

import { loginByUsername } from "./loginByUserName"

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
  removeItem: jest.fn(),
} as Storage

jest.mock("../../../../../shared/config/i18n/i18n", () => ({
  t: (key: string) => key,
}))

jest.mock(
  "shared/const/localstorage",
  () => ({
    USER_LOCALSTORAGE_KEY: "user-local-storage",
  }),
  { virtual: true }
)

describe("Тест loginByUserName", () => {
  const userValue = { username: "123", id: "1" }
  const thunk = new TestAsyncThunk(loginByUsername)
  test("Успешный запрос ввода пароля и логина", async () => {
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
    const result = await thunk.callThunk({ username: "123", password: "123" })
    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(userValue)
    )
    expect(thunk.dispatch).toHaveBeenCalledTimes(3) // количество вызовов dispatch
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe("fulfilled")
    expect(result.payload).toEqual(userValue)
  })

  test("Тест ошибки ввода login", async () => {
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk({ username: "123", password: "123" })

    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(result.meta.requestStatus).toBe("rejected")
    expect(result.payload).toBe("errorFormAuth")
  })
})
