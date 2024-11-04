import { IStateSchema } from "1_app/providers/StoreProvider"
import { ValidateProfileError } from "entities/Profile"
import { getProfileValidateErrors } from "./getProfileValidateErrors"

describe("getProfileValidateErrors.test", () => {
  test("should work with filled state", () => {
    const state: DeepPartial<IStateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.SERVER_ERROR,
          ValidateProfileError.INCORRECT_AGE,
        ],
      },
    }
    expect(getProfileValidateErrors(state as IStateSchema)).toEqual([
      ValidateProfileError.SERVER_ERROR,
      ValidateProfileError.INCORRECT_AGE,
    ])
  })
  test("should work with empty state", () => {
    const state: DeepPartial<IStateSchema> = {}
    expect(getProfileValidateErrors(state as IStateSchema)).toEqual(undefined)
  })
})
