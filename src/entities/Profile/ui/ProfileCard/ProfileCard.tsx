import React from "react"
import { useTranslation } from "react-i18next"
import { Country, Currency } from "shared/const/common"
import { cn } from "shared/lib/classNames/classNames"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Input } from "shared/ui/Input/Input"
import { Loader } from "shared/ui/Loader/Loader"
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
      <div
        className={cn("profile-card", [
          className,
          isLoading && "profile-card__loading",
        ])}
      >
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div
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
      </div>
    )
  }

  return (
    <div className={cn("profile-card", [className])}>
      {data?.avatar && (
        <div className={cn("profile-card__avatar", [className])}>
          <Avatar src={data?.avatar} alt="Аватар" size={50} />
        </div>
      )}
      <Input
        className={"profile-card__input"}
        value={data?.first}
        placeholder={t("profileCardInputPlaceholderFirstName")}
        onChange={onChangeFirstName}
        isReadonly={isReadonly}
      />
      <Input
        className={"profile-card__input"}
        value={data?.lastName}
        placeholder={t("profileCardInputPlaceholderLastName")}
        onChange={onChangeLastName}
        isReadonly={isReadonly}
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
    </div>
  )
}
