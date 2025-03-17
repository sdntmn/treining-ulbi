import React, { HTMLAttributeAnchorTarget } from "react"
import { cn } from "shared/lib/classNames/classNames"

import { ArticleViewType, Article } from "../../model/types/article"
import { ArticleListItem } from "../ArticleListItem/ArticleListItem"
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton"

import "./ArticleList.module.scss"

interface ArticleListProps {
  articles: Article[]
  className?: string
  isLoading?: boolean
  target?: HTMLAttributeAnchorTarget
  view?: ArticleViewType
}

const getSkeletons = (view: ArticleViewType) => {
  const skeletons = Array.from(
    { length: view === ArticleViewType.CARD ? 9 : 3 },
    (_, index) => (
      <ArticleListItemSkeleton
        className="article-list__card"
        key={`skeleton-${index}`}
        view={view}
      />
    )
  )
  return skeletons
}

export const ArticleList: React.FC<ArticleListProps> = (
  props: ArticleListProps
) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleViewType.CARD,
    target,
  } = props

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        article={article}
        view={view}
        className="article-list__card"
        key={article.id}
        target={target}
      />
    )
  }
  return (
    <div className={cn("article-list", [className])}>
      {articles.length ? articles.map(renderArticle) : "Нет статей"}
      {isLoading && getSkeletons(view)}
    </div>
  )
}
