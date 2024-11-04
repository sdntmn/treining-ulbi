import { IStateSchema } from "1_app/providers/StoreProvider"

import { Country } from "entities/Country"
import { Currency } from "entities/Currency"
import { getProfileForm } from "./getProfileForm"
import avatar from "shared/assets/tests/avatar.jpg"

describe("getProfileForm.test", () => {
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
    const state: DeepPartial<IStateSchema> = {
      profile: {
        form: data,
      },
    }
    expect(getProfileForm(state as IStateSchema)).toEqual(data)
  })
  test("should work with empty state", () => {
    const state: DeepPartial<IStateSchema> = {}
    expect(getProfileForm(state as IStateSchema)).toEqual(undefined)
  })
})
