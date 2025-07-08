import React, { memo } from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/classNames/classNames"
import { Card } from "@/shared/ui/deprecated/Card"
import { Input } from "@/shared/ui/deprecated/Input"

import { ArticleSortSelector } from "@/features/ArticleSortSelector"
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs"
import { ArticleViewSelector } from "@/features/ArticleViewSelector"

import { useArticleFilters } from "../../lib/hooks/useArticleFilters"

import "./ArticlesPageFilters.module.scss"

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters: React.FC<ArticlesPageFiltersProps> = memo(
  function ArticlesPageFilters(props: ArticlesPageFiltersProps) {
    const { className } = props
    const { t } = useTranslation("article")

    const {
      onChangeSort,
      onChangeType,
      sort,
      type,
      onChangeSearch,
      search,
      onChangeView,
      view,
      onChangeOrder,
      order,
    } = useArticleFilters()

    return (
      <div className={cn("articles-page-filters", [className])}>
        <div className="articles-page-filters__sort-wrapper">
          <ArticleSortSelector
            sort={sort}
            order={order}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className="articles-page-filters__search">
          <Input
            onChange={onChangeSearch}
            value={search}
            placeholder={t("articlePlaceholderSearch")}
          />
        </Card>
        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={"articles-page-filters__tabs"}
        />
      </div>
    )
  }
)
