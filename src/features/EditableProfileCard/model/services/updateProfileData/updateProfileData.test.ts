import { Country, Currency } from "@/shared/const/enums"
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk"

import { ValidateProfileError } from "../../types/EditableProfileCardSchema"

import { updateProfileData } from "./updateProfileData"

const data = {
  first: "Денис",
  lastName: "Сорокин",
  age: 46,
  currency: Currency.RUB,
  country: Country.Russia,
  city: "Tyumen",
  username: "admin",
  // avatar: avatar,
  id: "1",
}

describe("Обновление профиля", () => {
  test("Успешно", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    })

    thunk.api.put.mockReturnValue(Promise.resolve({ data }))

    const result = await thunk.callThunk()

    expect(thunk.api.put).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe("fulfilled")
    expect(result.payload).toEqual(data)
  })

  test("Ошибка обновления сервера (HTTP 403)", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    })
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe("rejected")
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
  })

  test("Ошибка валидации данных", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...data, lastName: "" },
      },
    })
    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe("rejected")
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
  })
})
