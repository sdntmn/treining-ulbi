/* eslint-disable max-len */
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { Country, Currency } from "@/shared/const/enums"
import { cn } from "@/shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect"
import { TextParagraf, TextVar } from "@/shared/ui/deprecated/TextParagraf"
import { VStack } from "@/shared/ui/redesigned/Stack"

import { ProfileCard } from "@/entities/Profile"

import { getProfileError } from "../../model/selectors/getProfileError/getProfileError"
import { getProfileForm } from "../../model/selectors/getProfileForm/getProfileForm"
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading"
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly"
import { getProfileValidateErrors } from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors"
import { fetchProfileData } from "../../model/services/fetchProfileData/fetchProfileData"
import { profileActions, profileReducer } from "../../model/slice/profileSlice"
import { ValidateProfileError } from "../../model/types/EditableProfileCardSchema"
import { EditableProfileCardHeader } from "../EditableProfileCardHeader/EditableProfileCardHeader"

interface EditableProfileCardProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  profile: profileReducer,
}

export const EditableProfileCard: React.FC<EditableProfileCardProps> = (
  props: EditableProfileCardProps
) => {
  const { className, id } = props
  const dispatch = useAppDispatch()
  const { t } = useTranslation("profile")
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

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id))
    }
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack gap="16" max className={cn("editable-profile-card", [className])}>
        <EditableProfileCardHeader />
        {Boolean(validateErrors) &&
          validateErrors?.map((err) => (
            <TextParagraf
              key={err}
              textVar={TextVar.ERROR}
              text={validateErrorTranslates[err]}
              data-testid={"EditableProfileCard.Error"}
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
      </VStack>
    </DynamicModuleLoader>
  )
}
