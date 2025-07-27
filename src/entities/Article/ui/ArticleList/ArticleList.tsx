import { HTMLAttributeAnchorTarget, memo } from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { TextParagraf, TextSize } from "@/shared/ui/deprecated/TextParagraf"
import { HStack } from "@/shared/ui/redesigned/Stack"

import { ArticleViewType } from "../../model/consts"
import { Article } from "../../model/types/article"
import { ArticleListItem } from "../ArticleListItem/ArticleListItem"
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton"

import "./ArticleList.module.scss"

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  target?: HTMLAttributeAnchorTarget
  view?: ArticleViewType
}

const getSkeletons = (view: ArticleViewType) =>
  new Array(view === ArticleViewType.CARD ? 9 : 3)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton
        className={cn("article-list", [
          view === ArticleViewType.CARD ? "article-list__card" : "article-list__list",
        ])}
        key={index}
        view={view}
      />
    ))

export const ArticleList = memo((props: ArticleListProps) => {
  const { articles, view = ArticleViewType.CARD, isLoading, target } = props
  const { t } = useTranslation()

  if (!isLoading && !articles.length) {
    return (
      <div>
        <TextParagraf size={TextSize.L} title={t("Статьи не найдены")} />
      </div>
    )
  }

  return (
    <ToggleFeaturesComponent
      feature="isAppRedesigned"
      on={
        <HStack wrap="wrap" gap="16" data-testid="ArticleList">
          {articles.map((item) => (
            <ArticleListItem article={item} view={view} target={target} key={item.id} />
          ))}
          {isLoading && getSkeletons(view)}
        </HStack>
      }
      off={
        <div data-testid="ArticleList">
          {articles.map((item) => (
            <ArticleListItem article={item} view={view} target={target} key={item.id} />
          ))}
          {isLoading && getSkeletons(view)}
        </div>
      }
    />
  )
})

ArticleList.displayName = "ArticleList"
