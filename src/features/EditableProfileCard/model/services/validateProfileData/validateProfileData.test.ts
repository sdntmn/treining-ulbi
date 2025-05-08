import { Country, Currency } from "shared/const/enums"

import { ValidateProfileError } from "../../types/EditableProfileCardSchema"
import { validateProfileData } from "./validateProfileData"

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

describe("validateProfileData.test", () => {
  test("success", async () => {
    const result = validateProfileData(data)

    expect(result).toEqual([])
  })

  test("without first and last name", async () => {
    const result = validateProfileData({ ...data, first: "", lastName: "" })

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
  })

  test("incorrect age", async () => {
    const result = validateProfileData({ ...data, age: undefined })

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE])
  })

  test("incorrect country", async () => {
    const result = validateProfileData({ ...data, country: undefined })

    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY])
  })

  test("incorrect all", async () => {
    const result = validateProfileData({})

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ])
  })
})
