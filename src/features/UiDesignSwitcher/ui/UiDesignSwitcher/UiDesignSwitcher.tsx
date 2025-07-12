import { memo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { getFeatureFlag, toggleFeatures, updateFeatureFlag } from "@/shared/lib/features"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton"
import { ListBox } from "@/shared/ui/redesigned/Popups"
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton"
import { HStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

import { getUserAuthData } from "@/entities/User"

interface UiDesignSwitcherProps {
  className?: string
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props
  const { t } = useTranslation("main")
  const isAppRedesigned = getFeatureFlag("isAppRedesigned")
  const dispatch = useAppDispatch()
  const authData = useSelector(getUserAuthData)
  const [isLoading, setIsLoading] = useState(false)

  const items = [
    {
      content: t("newDesign"),
      value: "new",
    },
    {
      content: t("oldDesign"),
      value: "old",
    },
  ]

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true)
      await dispatch(
        updateFeatureFlag({
          userId: authData.id,
          newFeatures: {
            isAppRedesigned: value === "new",
          },
        })
      ).unwrap()
      setIsLoading(false)
    }
  }

  const Skeleton = toggleFeatures({
    name: "isAppRedesigned",
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  })

  return (
    <HStack gap="16">
      <Text text={t("interfaceOption")} />
      {isLoading ? (
        <Skeleton width={120} height={32} border="34px" />
      ) : (
        <ListBox
          onChange={onChange}
          items={items}
          value={isAppRedesigned ? "new" : "old"}
          className={className}
        />
      )}
    </HStack>
  )
})

UiDesignSwitcher.displayName = "UiDesignSwitcher"
