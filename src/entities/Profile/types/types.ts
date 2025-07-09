import { Country, Currency } from "@/shared/const/enums"

import { Profile } from "../model/types/profile"

export interface ProfileCardProps {
  className?: string
  data?: Profile
  isLoading?: boolean
  isReadonly?: boolean
  error?: string
  onChangeFirstName?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeLastName?: (value?: string) => void
  onChangeCurrency?: (currency: Currency) => void
  onChangeCountry?: (country: Country) => void
  onChangeAvatar?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeAge?: (value?: string) => void
}
