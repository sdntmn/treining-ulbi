import "./ArticleListItem.module.scss"

import { memo } from "react"

import { ToggleFeaturesComponent } from "@/shared/lib/features"

import { ArticleListItemDeprecated } from "./ArticleListItemDeprecated/ArticleListItemDeprecated"
import { ArticleListItemRedesigned } from "./ArticleListItemRedesigned/ArticleListItemRedesigned"
import { ArticleListItemProps } from "./type"

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  return (
    <ToggleFeaturesComponent
      feature="isAppRedesigned"
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  )
})

ArticleListItem.displayName = "ArticleListItem"
