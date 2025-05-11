import { Country, Currency } from "@/shared/const/enums"

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
