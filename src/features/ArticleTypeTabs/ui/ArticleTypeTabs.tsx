import React, { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { TabItem, Tabs as TabsDeprecated } from "@/shared/ui/deprecated/Tabs"
import { Tabs } from "@/shared/ui/redesigned/Tabs"

import { ArticleType } from "@/entities/Article"

interface ArticleTypeTabsProps {
  className?: string
  value: ArticleType
  onChangeType: (type: ArticleType) => void
}

export const ArticleTypeTabs: React.FC<ArticleTypeTabsProps> = memo(function ArticleTypeTabs(
  props: ArticleTypeTabsProps
) {
  const { className, value, onChangeType } = props
  const { t } = useTranslation("article")

  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t("articleTypeTabsAll"),
      },
      {
        value: ArticleType.IT,
        content: t("articleTypeTabsIT"),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t("articleTypeTabsEconomics"),
      },
      {
        value: ArticleType.SCIENCE,
        content: t("articleTypeTabsScience"),
      },
    ],
    [t]
  )

  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType)
    },
    [onChangeType]
  )

  return (
    <ToggleFeaturesComponent
      feature="isAppRedesigned"
      on={
        <Tabs
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
          className={cn("", [className])}
          direction="column"
        />
      }
      off={
        <TabsDeprecated
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
          className={cn("", [className])}
        />
      }
    />
  )
})
