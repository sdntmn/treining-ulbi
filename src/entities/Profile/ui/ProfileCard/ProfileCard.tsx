import React from "react"

import { Country, Currency } from "@/shared/const/enums"
import { ToggleFeaturesComponent } from "@/shared/lib/features"

import { Profile } from "../../model/types/profile"
import {
  ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedLoader,
} from "../ProfileCardDeprecated/ProfileCardDeprecated"
import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton,
} from "../ProfileCardRedesigned/ProfileCardRedesigned"

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

export const ProfileCard: React.FC<ProfileCardProps> = (props: ProfileCardProps) => {
  const { isLoading, error } = props
  if (isLoading) {
    return (
      <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<ProfileCardRedesignedSkeleton />}
        off={<ProfileCardDeprecatedLoader />}
      />
    )
  }

  if (error) {
    return (
      <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<ProfileCardRedesignedError />}
        off={<ProfileCardDeprecatedError />}
      />
    )
  }

  return (
    <ToggleFeaturesComponent
      feature="isAppRedesigned"
      on={<ProfileCardRedesigned {...props} />}
      off={<ProfileCardDeprecated {...props} />}
    />
  )
}
