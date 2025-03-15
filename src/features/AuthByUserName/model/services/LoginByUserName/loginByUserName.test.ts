/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from "@reduxjs/toolkit"
import { StateSchema } from "app/providers/StoreProvider"
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"

import { userActions } from "../../../../../entities/User"
import { loginByUsername } from "./loginByUserName"

describe("Тест loginByUserName", () => {
  let dispatch: Dispatch
  let getState: () => StateSchema

  beforeEach(() => {
    dispatch = jest.fn()
    getState = jest.fn()
  })

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

  // test("Возвращает error 403", async () => {
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
  //   const action = loginByUsername({ username: "123", password: "123" })
  //   const result = await action(dispatch, getState, undefined)
  //   expect(mockedAxios.post).toHaveBeenCalled()
  //   expect(dispatch).toHaveBeenCalledTimes(2) // количество вызовов dispatch
  //   expect(result.meta.requestStatus).toBe("rejected")
  //   expect(result.payload).toBe("Вы ввели неверный логин или пароль")
  // })
  // test("test success login on", async () => {
  //   const userValue = { username: "123", id: "1" }

  //   const thunk = new TestAsyncThunk(loginByUsername)
  //   // thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
  //   const result = await thunk.callThunk({ username: "123", password: "123" })

  //   expect(thunk.dispatch).toHaveBeenCalledWith(
  //     userActions.setAuthData(userValue)
  //   )
  //   expect(thunk.dispatch).toHaveBeenCalledTimes(3)
  //   // expect(thunk.api.post).toHaveBeenCalled()
  //   expect(result.meta.requestStatus).toBe("fulfilled")
  //   expect(result.payload).toEqual(userValue)
  // })

  test("Тест ошибки ввода login", async () => {
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk({ username: "123", password: "123" })

    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    // expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe("rejected")
    expect(result.payload).toBe("errorFormAuth")
  })
})
