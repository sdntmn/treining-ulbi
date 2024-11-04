import { Country, Currency } from "shared/const/common"

export enum ValidateProfileError {
  INCORRECT_USER_DATA = "INCORRECT_USER_DATA",
  INCORRECT_AGE = "INCORRECT_AGE",
  INCORRECT_COUNTRY = "INCORRECT_COUNTRY",
  SERVER_ERROR = "SERVER_ERROR",
  NO_DATA = "NO_DATA",
}

export interface Profile {
  id?: string
  first?: string
  lastName?: string
  age?: number
  currency?: Currency
  country?: Country
  city?: string
  username?: string
  avatar?: string
}

export interface ProfileSchema {
  isLoading: boolean
  isReadonly: boolean
  data?: Profile
  form?: Profile
  error?: string
  validateErrors?: ValidateProfileError[]
}
