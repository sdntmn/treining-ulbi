import React from "react"

import { ToggleFeaturesComponent } from "@/shared/lib/features"

import { ProfileCardProps } from "../../types/types"
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
