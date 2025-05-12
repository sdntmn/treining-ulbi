import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/classNames/classNames"
import { SortOrder } from "@/shared/types"
import { Select } from "@/shared/ui/Select/Select"

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
        content: t("возрастанию"),
      },
      {
        value: "desc",
        content: t("убыванию"),
      },
    ],
    [t]
  )

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t("дате создания"),
      },
      {
        value: ArticleSortField.TITLE,
        content: t("названию"),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t("просмотрам"),
      },
    ],
    [t]
  )

  return (
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
  )
}
