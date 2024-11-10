import {
  profileActions,
  profileReducer,
  // updateProfileData,
  // ValidateProfileError,
} from "../slice/profileSlice"
// import avatar from "shared/assets/tests/avatar.jpg"
import { Country, Currency } from "shared/const/common"

import { updateProfileData } from "../services/updateProfileData/updateProfileData"
import { ProfileSchema, ValidateProfileError } from "../types/profile"

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

describe("profileSlice.test", () => {
  test("test set readonly", () => {
    const state: DeepPartial<ProfileSchema> = { isReadonly: false }
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true))
    ).toEqual({ isReadonly: true })
  })

  test("test cancel edit", () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: "" } }

    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({
      isReadonly: true,
      validateErrors: undefined,
      data,
      form: data,
    })
  })

  test("test update profile", () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: "123" } }

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({
          username: "123456",
        })
      )
    ).toEqual({
      form: { username: "123456" },
    })
  })

  test("test update profile service pending", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    }

    expect(
      profileReducer(state as ProfileSchema, { ...updateProfileData.pending })
    ).toEqual({
      isLoading: true,
      validateErrors: undefined,
    })
  })

  test("test update profile service fullfiled", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, "")
      )
    ).toEqual({
      isLoading: false,
      validateErrors: undefined,
      isReadonly: true,
      validateError: undefined,
      form: data,
      data,
    })
  })
})
