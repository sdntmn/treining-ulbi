import { cn } from "shared/lib/classNames/classNames"

import { ArticleViewType, Article } from "../../model/types/article"
import { ArticleListItem } from "../ArticleListItem/ArticleListItem"
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton"

import "./ArticleList.module.scss"

interface ArticleListProps {
  articles: Article[]
  className?: string
  isLoading?: boolean
  view?: ArticleViewType
}

const getSkeletons = (view: ArticleViewType) =>
  new Array(view === ArticleViewType.CARD ? 9 : 3)
    .fill(0)
    .map((_item, index) => (
      <ArticleListItemSkeleton
        className="article-list__card"
        key={index}
        view={view}
      />
    ))

export const ArticleList = (props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleViewType.CARD } = props

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        article={article}
        view={view}
        className="article-list__card"
        key={article.id}
      />
    )
  }
  return (
    <div className={cn("article-list", [className])}>
      {articles.length ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  )
}
