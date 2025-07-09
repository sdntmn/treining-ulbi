import { HTMLAttributeAnchorTarget } from "react"

import { ArticleViewType } from "../../model/consts"
import { Article } from "../../model/types"

export interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleViewType
  target?: HTMLAttributeAnchorTarget
}
