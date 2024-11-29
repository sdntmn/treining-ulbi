import { memo } from "react"
import { cn } from "shared/lib/classNames/classNames"
import { Card } from "shared/ui/Card/Card"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"

import { ArticleViewType } from "../../model/types/article"

import "./ArticleListItem.module.scss"

interface ArticleListItemSkeletonProps {
  className?: string
  view: ArticleViewType
}

export const ArticleListItemSkeleton = memo(function ArticleListItemSkeleton(
  props: ArticleListItemSkeletonProps
) {
  const { className, view } = props

  if (view === ArticleViewType.LIST) {
    return (
      <div className={cn("article-list-item", [className])}>
        <Card className="article-list-item__card">
          <div className="article-list-item__header">
            <Skeleton border="50%" height={30} width={30} />
            <Skeleton
              width={150}
              height={16}
              className="article-list-item__username"
            />
            <Skeleton
              width={150}
              height={16}
              className="article-list-item__date"
            />
          </div>
          <Skeleton
            width={250}
            height={24}
            className="article-list-item__title"
          />
          <Skeleton height={208} className="article-list-item__img" />
          <div className="article-list-item__footer">
            <Skeleton height={36} width={200} />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("article-list-item", [className])}>
      <Card className="article-list-item__card">
        <div className="article-list-item__image-wrapper">
          <Skeleton
            width={200}
            height={200}
            className="article-list-item__img"
          />
        </div>
        <div className="article-list-item__info-wrapper">
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton
          width={150}
          height={16}
          className="article-list-item__title"
        />
      </Card>
    </div>
  )
})
