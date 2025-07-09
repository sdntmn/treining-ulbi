/* eslint-disable paths-import/imports-layers */
import { memo } from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/classNames/classNames"
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar"
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input"
import { Loader } from "@/shared/ui/deprecated/Loader"
import {
  TextAlign,
  TextParagraf as TextParagrafDeprecated,
  TextVar,
} from "@/shared/ui/deprecated/TextParagraf"
import { HStack, VStack } from "@/shared/ui/redesigned/Stack"

import { CountrySelect } from "@/entities/Country"
import { CurrencySelect } from "@/entities/Currency"

import { ProfileCardProps } from "../ProfileCard/ProfileCard"

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation("profile")

  return (
    <HStack
      justify="center"
      max
      className={cn("profile-card-deprecated", ["profile-card-deprecated__error"])}
    >
      <TextParagrafDeprecated
        textVar={TextVar.ERROR}
        title={t("profileCardErrorTitle")}
        text={t("profileCardErrorText")}
        align={TextAlign.CENTER}
      />
    </HStack>
  )
}

export const ProfileCardDeprecatedLoader = () => {
  return (
    <HStack
      justify="center"
      max
      className={cn("profile-card-deprecated", [true && "profile-card-deprecated__loading"])}
    >
      <Loader />
    </HStack>
  )
}

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    isReadonly,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
  } = props
  const { t } = useTranslation("profile")

  return (
    <VStack gap="8" max className={cn("profile-card-deprecated", [className])}>
      {data?.avatar && (
        <HStack justify="center" max>
          <AvatarDeprecated src={data?.avatar} alt="Аватар" size={50} />
        </HStack>
      )}
      <InputDeprecated
        className={"profile-card-deprecated__input"}
        value={data?.first}
        placeholder={t("profileCardInputPlaceholderFirstName")}
        onChange={onChangeFirstName}
        isReadonly={isReadonly}
        data-testid="ProfileCard.FirstName"
      />
      <InputDeprecated
        className={"profile-card-deprecated__input"}
        value={data?.lastName}
        placeholder={t("profileCardInputPlaceholderLastName")}
        onChange={onChangeLastName}
        isReadonly={isReadonly}
        data-testid="ProfileCard.LastName"
      />
      <InputDeprecated
        className={"profile-card-deprecated__input"}
        value={data?.age}
        placeholder={t("profileCardInputPlaceholderAge")}
        onChange={onChangeAge}
        isReadonly={isReadonly}
      />
      <InputDeprecated
        className={"profile-card-deprecated__input"}
        value={data?.city}
        placeholder={t("profileCardInputPlaceholderCity")}
        onChange={onChangeCity}
        isReadonly={isReadonly}
      />
      <InputDeprecated
        className={"profile-card-deprecated__input"}
        value={data?.avatar}
        placeholder={t("profileCardInputPlaceholderAvatar")}
        onChange={onChangeAvatar}
        isReadonly={isReadonly}
      />
      <InputDeprecated
        className={"profile-card-deprecated__input"}
        value={data?.username}
        placeholder={t("profileCardInputPlaceholderNick")}
        onChange={onChangeUsername}
        isReadonly={isReadonly}
      />
      <CurrencySelect
        className={"profile-card-deprecated__input"}
        value={data?.currency}
        onChange={onChangeCurrency}
        isReadonly={isReadonly}
      />
      <CountrySelect
        className={"profile-card-deprecated__input"}
        value={data?.country}
        onChange={onChangeCountry}
        isReadonly={isReadonly}
      />
    </VStack>
  )
})

ProfileCardDeprecated.displayName = "ProfileCardDeprecated"
