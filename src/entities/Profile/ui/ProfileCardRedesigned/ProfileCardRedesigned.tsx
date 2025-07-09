/* eslint-disable paths-import/imports-layers */
import { memo } from "react"
import { useTranslation } from "react-i18next"

import { Avatar } from "@/shared/ui/redesigned/Avatar"
import { Card } from "@/shared/ui/redesigned/Card"
import { Input } from "@/shared/ui/redesigned/Input"
import { Skeleton } from "@/shared/ui/redesigned/Skeleton"
import { HStack, VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

import { CountrySelect } from "@/entities/Country"
import { CurrencySelect } from "@/entities/Currency"

import { ProfileCardProps } from "../ProfileCard/ProfileCard"

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation("profile")

  return (
    <HStack justify="center" max>
      <Text
        variant="error"
        title={t("profileCardErrorTitle")}
        text={t("profileCardErrorText")}
        align="center"
      />
    </HStack>
  )
}

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card padding="24" max>
      <VStack gap="32">
        <HStack max justify="center">
          <Skeleton border="100%" width={128} height={128} />
        </HStack>
        <HStack gap="32" max>
          <VStack gap="16" max>
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
          </VStack>

          <VStack gap="16" max>
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  )
}

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
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
    <Card padding="24" max className={className}>
      <VStack gap="32">
        {data?.avatar && (
          <HStack justify="center" max>
            <Avatar size={128} src={data?.avatar} />
          </HStack>
        )}
        <HStack gap="24" max>
          <VStack gap="16" max>
            <Input
              value={data?.first}
              label={t("profileCardInputPlaceholderFirstName")}
              onChange={onChangeFirstName}
              isReadonly={isReadonly}
              data-testid="ProfileCard.firstname"
            />
            <Input
              value={data?.lastName}
              label={t("profileCardInputPlaceholderLastName")}
              onChange={onChangeLastName}
              isReadonly={isReadonly}
              data-testid="ProfileCard.lastname"
            />
            <Input
              value={data?.age}
              label={t("profileCardInputPlaceholderAge")}
              onChange={onChangeAge}
              isReadonly={isReadonly}
            />
            <Input
              value={data?.city}
              label={t("profileCardInputPlaceholderCity")}
              onChange={onChangeCity}
              isReadonly={isReadonly}
            />
          </VStack>
          <VStack gap="16" max>
            <Input
              value={data?.username}
              label={t("profileCardInputPlaceholderNick")}
              onChange={onChangeUsername}
              isReadonly={isReadonly}
            />
            <Input
              value={data?.avatar}
              label={t("profileCardInputPlaceholderAvatar")}
              onChange={onChangeAvatar}
              isReadonly={isReadonly}
            />
            <CurrencySelect
              value={data?.currency}
              onChange={onChangeCurrency}
              isReadonly={isReadonly}
            />
            <CountrySelect
              value={data?.country}
              onChange={onChangeCountry}
              isReadonly={isReadonly}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  )
})

ProfileCardRedesigned.displayName = "ProfileCardRedesigned"
