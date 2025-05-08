import React from "react"
import { useTranslation } from "react-i18next"
import { Country, Currency } from "shared/const/enums"
import { cn } from "shared/lib/classNames/classNames"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Input } from "shared/ui/Input/Input"
import { Loader } from "shared/ui/Loader/Loader"
import { HStack, VStack } from "shared/ui/Stack"
import {
  TextAlign,
  TextParagraf,
  TextVar,
} from "shared/ui/TextParagraf/TextParagraf"

import { CountrySelect } from "../../../Country"
import { CurrencySelect } from "../../../Currency"
import { Profile } from "../../model/types/profile"

import "./ProfileCard.module.scss"

interface ProfileCardProps {
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

export const ProfileCard: React.FC<ProfileCardProps> = (
  props: ProfileCardProps
) => {
  const {
    isReadonly,
    isLoading,
    className,
    error,
    data,
    onChangeFirstName,
    onChangeUsername,
    onChangeLastName,
    onChangeCurrency,
    onChangeCountry,
    onChangeAvatar,
    onChangeCity,
    onChangeAge,
  } = props

  const { t } = useTranslation("profile")

  if (isLoading) {
    return (
      <HStack
        justify="center"
        max
        className={cn("profile-card", [
          className,
          isLoading && "profile-card__loading",
        ])}
      >
        <Loader />
      </HStack>
    )
  }

  if (error) {
    return (
      <HStack
        justify="center"
        max
        className={cn("profile-card", [
          className,
          error && "profile-card__error",
        ])}
      >
        <TextParagraf
          textVar={TextVar.ERROR}
          title={t("profileCardErrorTitle")}
          text={t("profileCardErrorText")}
          align={TextAlign.CENTER}
        />
      </HStack>
    )
  }

  return (
    <VStack gap="8" max className={cn("profile-card", [className])}>
      {data?.avatar && (
        <HStack justify="center" max>
          <Avatar src={data?.avatar} alt="Аватар" size={50} />
        </HStack>
      )}
      <Input
        className={"profile-card__input"}
        value={data?.first}
        placeholder={t("profileCardInputPlaceholderFirstName")}
        onChange={onChangeFirstName}
        isReadonly={isReadonly}
        data-testid="ProfileCard.FirstName"
      />
      <Input
        className={"profile-card__input"}
        value={data?.lastName}
        placeholder={t("profileCardInputPlaceholderLastName")}
        onChange={onChangeLastName}
        isReadonly={isReadonly}
        data-testid="ProfileCard.Lastname"
      />
      <Input
        className={"profile-card__input"}
        value={data?.age}
        placeholder={t("profileCardInputPlaceholderAge")}
        onChange={onChangeAge}
        isReadonly={isReadonly}
      />
      <Input
        className={"profile-card__input"}
        value={data?.city}
        placeholder={t("profileCardInputPlaceholderCity")}
        onChange={onChangeCity}
        isReadonly={isReadonly}
      />
      <Input
        className={"profile-card__input"}
        value={data?.avatar}
        placeholder={t("profileCardInputPlaceholderAvatar")}
        onChange={onChangeAvatar}
        isReadonly={isReadonly}
      />
      <Input
        className={"profile-card__input"}
        value={data?.username}
        placeholder={t("profileCardInputPlaceholderNick")}
        onChange={onChangeUsername}
        isReadonly={isReadonly}
      />
      <CurrencySelect
        className={"profile-card__input"}
        value={data?.currency}
        onChange={onChangeCurrency}
        isReadonly={isReadonly}
      />
      <CountrySelect
        className={"profile-card__input"}
        value={data?.country}
        onChange={onChangeCountry}
        isReadonly={isReadonly}
      />
    </VStack>
  )
}
