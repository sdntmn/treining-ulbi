import {
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadonly,
  getProfileValidateErrors,
  profileActions,
  ProfileCard,
  ValidateProfileError,
} from "entities/Profile"
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Currency, Country } from "shared/const/common"
import { cn } from "shared/lib/classNames/classNames"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { TextParagraf, TextVar } from "shared/ui/TextParagraf/TextParagraf"

import "./CardEditingProfile.module.scss"

export interface CardEditingProfileProps {
  className?: string
}

export const CardEditingProfile: React.FC<CardEditingProfileProps> = ({
  className,
}: CardEditingProfileProps) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation("proile")
  const formData = useSelector(getProfileForm)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  const isReadonly = useSelector(getProfileReadonly)
  const validateErrors = useSelector(getProfileValidateErrors)

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t("errorEditProfileServer"),
    [ValidateProfileError.INCORRECT_AGE]: t("errorEditProfileAge"),
    [ValidateProfileError.INCORRECT_COUNTRY]: t("errorEditProfileCountry"),
    [ValidateProfileError.INCORRECT_USER_DATA]: t("errorEditProfileUserData"),
    [ValidateProfileError.NO_DATA]: t("errorEditProfileNoData"),
  }

  const onChangeFirstName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || "" }))
    },
    [dispatch]
  )
  const onChangeLastName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastName: value || "" }))
    },
    [dispatch]
  )

  const onChangeAge = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ age: Number(value || 0) }))
    },
    [dispatch]
  )

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || "" }))
    },
    [dispatch]
  )

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || "" }))
    },
    [dispatch]
  )

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || "" }))
    },
    [dispatch]
  )

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }))
    },
    [dispatch]
  )
  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }))
    },
    [dispatch]
  )

  return (
    <div className={cn("card-editing-profile", [className])}>
      {Boolean(validateErrors) &&
        validateErrors?.map((err) => (
          <TextParagraf
            key={err}
            textVar={TextVar.ERROR}
            text={validateErrorTranslates[err]}
          />
        ))}
      <ProfileCard
        error={error}
        data={formData}
        isLoading={isLoading}
        isReadonly={isReadonly}
        onChangeAge={onChangeAge}
        onChangeCity={onChangeCity}
        onChangeAvatar={onChangeAvatar}
        onChangeCountry={onChangeCountry}
        onChangeLastName={onChangeLastName}
        onChangeUsername={onChangeUsername}
        onChangeCurrency={onChangeCurrency}
        onChangeFirstName={onChangeFirstName}
      />
    </div>
  )
}
