import { Country, Currency } from "shared/const/common"
// import avatar from "shared/assets/tests/avatar.jpg"
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"

import { fetchProfileData } from "./fetchProfileData"

describe("fetchProfileData.test", () => {
  const data = {
    first: "Денис",
    lastName: "Сорокин",
    age: 46,
    currency: Currency.RUB,
    country: Country.Russia,
    city: "Tyumen",
    username: "admin",
    // avatar: avatar,
  }

  test("success", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ data: data }))

    const result = await thunk.callThunk("1")

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe("fulfilled")
    expect(result.payload).toEqual(data)
  })

  test("error login", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk("1")

    expect(result.meta.requestStatus).toBe("rejected")
  })
})
