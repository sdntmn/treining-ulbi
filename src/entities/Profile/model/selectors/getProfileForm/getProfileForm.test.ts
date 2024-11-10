import { StateSchema } from "app/providers/StoreProvider"

import { Country } from "../../../../Country/model/types/country"
import { Currency } from "../../../../Currency/model/types/currency"
import { getProfileForm } from "./getProfileForm"

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
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
      },
    }
    expect(getProfileForm(state as StateSchema)).toEqual(data)
  })
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileForm(state as StateSchema)).toEqual(undefined)
  })
})
