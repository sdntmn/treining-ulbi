import { Profile } from "@/entities/Profile"

import { ValidateProfileError } from "../../types/EditableProfileCardSchema"

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA]
  }
  const { first, lastName, age, country } = profile

  const errors: ValidateProfileError[] = []

  if (!first || !lastName) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA)
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE)
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY)
  }

  return errors
}
