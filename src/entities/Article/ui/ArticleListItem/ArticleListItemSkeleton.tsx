import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { toggleFeatures, ToggleFeaturesComponent } from "@/shared/lib/features"
import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card"
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton"
import { Card as CardRedesigned } from "@/shared/ui/redesigned/Card"
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton"
import { VStack } from "@/shared/ui/redesigned/Stack"

import { ArticleViewType } from "../../model/consts/consts"

import "./ArticleListItem.module.scss"

interface ArticleListItemSkeletonProps {
  className?: string
  view: ArticleViewType
}

export const ArticleListItemSkeleton: React.FC<ArticleListItemSkeletonProps> = memo(
  function ArticleListItemSkeleton(props: ArticleListItemSkeletonProps) {
    const { className, view } = props

    const Skeleton = toggleFeatures({
      name: "isAppRedesigned",
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    })
    const Card = toggleFeatures({
      name: "isAppRedesigned",
      on: () => CardRedesigned,
      off: () => CardDeprecated,
    })

    if (view === ArticleViewType.LIST) {
      return (
        <div className={cn("article-list-item", [className, `article-list-item-${view}`])}>
          <Card>
            <div className="article-list-item-list__header">
              <Skeleton border="50%" height={30} width={30} />
              <Skeleton width={150} height={16} className="article-list-item-list__username" />
              <Skeleton width={150} height={16} className="article-list-item-list__date" />
            </div>
            <Skeleton width={250} height={32} className="article-list-item-list__title" />
            <Skeleton height={208} className="article-list-item-list__img" />
            <Skeleton height={208} className="article-list-item-list__text-block" />
            <div className="article-list-item-list__footer">
              <Skeleton height={42} width={200} />
              <Skeleton height={20} width={40} />
            </div>
          </Card>
        </div>
      )
    }

    return (
      <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={
          <Card className="article-card-item-skeleton__card" padding="0">
            <div className="article-card-item-skeleton__image-wrapper">
              <Skeleton width={240} height={140} className="article-list-item-card__img" />
            </div>
            <VStack gap="8" className="article-card-item-skeleton__info">
              <Skeleton width={120} height={16} />
              <Skeleton width={220} height={102} />
              <Skeleton width={220} height={16} className="article-card-item-skeleton__title" />
              <Skeleton width={150} height={16} className="article-card-item-skeleton__title" />
            </VStack>
          </Card>
        }
        off={
          <div className={cn("article-list-item-card", [className])}>
            <Card className="article-list-item-card">
              <div className="article-list-item-card__image-wrapper">
                <Skeleton width={200} height={200} className="article-list-item-card__img" />
              </div>
              <div className="article-list-item-card__info-wrapper">
                <Skeleton width={130} height={16} />
              </div>
              <Skeleton width={150} height={16} className="article-list-item-card__title" />
            </Card>
          </div>
        }
      />
    )
  }
)
