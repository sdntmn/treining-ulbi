import { StateSchema } from "app/providers/StoreProvider"
import avatar from "shared/assets/tests/avatar.jpg"
import { Country, Currency } from "shared/const/common"

import { getProfileData } from "./getProfileData"

describe("getProfileData.test", () => {
  test("should return error", () => {
    const data = {
      first: "Денис",
      lastName: "Сорокин",
      age: 46,
      currency: Currency.RUB,
      country: Country.Russia,
      city: "Tyumen",
      username: "admin",
      avatar: avatar,
    }

    const state: DeepPartial<StateSchema> = {
      profile: {
        data: data,
      },
    }
    expect(getProfileData(state as StateSchema)).toEqual(data)
  })
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})
