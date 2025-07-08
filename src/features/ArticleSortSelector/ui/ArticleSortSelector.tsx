import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { SortOrder } from "@/shared/types/sort"
import { Select } from "@/shared/ui/deprecated/Select"
import { ListBox } from "@/shared/ui/redesigned/Popups"
import { VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

import { ArticleSortField } from "@/entities/Article"

import "./ArticleSortSelector.module.scss"

export interface SelectOption<T extends string> {
  value: T
  content: string
}

interface Props {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeOrder: (value: SortOrder) => void
  onChangeSort: (value: ArticleSortField) => void
}

export const ArticleSortSelector: React.FC<Props> = (props: Props) => {
  const { className, sort, order, onChangeOrder, onChangeSort } = props
  const { t } = useTranslation("article")

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: "asc",
        content: t("articleSortedByGrowth"),
      },
      {
        value: "desc",
        content: t("articleSortedByDescending"),
      },
    ],
    [t]
  )

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t("articleSortedByCreate"),
      },
      {
        value: ArticleSortField.TITLE,
        content: t("articleSortedByTitle"),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t("articleSortedByViews"),
      },
    ],
    [t]
  )

  return (
    <ToggleFeaturesComponent
      feature="isAppRedesigned"
      on={
        <div className={cn("articles-sort-selector", [className])}>
          <VStack gap="8">
            <Text text={t("articleSortedLabel")} />
            <ListBox items={sortFieldOptions} value={sort} onChange={onChangeSort} />
            <ListBox items={orderOptions} value={order} onChange={onChangeOrder} />
          </VStack>
        </div>
      }
      off={
        <div className={cn("articles-sort-selector", [className])}>
          <Select<ArticleSortField>
            label={t("articleSortedLabel")}
            options={sortFieldOptions}
            value={sort}
            onChange={onChangeSort}
          />
          <Select<SortOrder>
            label={t("articleOrderSortedLabel")}
            options={orderOptions}
            value={order}
            onChange={onChangeOrder}
          />
        </div>
      }
    />
  )
}
