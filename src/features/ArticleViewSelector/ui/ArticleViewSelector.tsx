import React, { memo } from "react"

import TiledIcon from "@/shared/assets/icons/card.svg"
import ListIcon from "@/shared/assets/icons/list.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { Button, ButtonVar } from "@/shared/ui/Button"
import { Icon } from "@/shared/ui/Icon"

import { ArticleViewType } from "@/entities/Article"
import "./ArticleViewSelector.module.scss"

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleViewType
  onViewClick?: (view: ArticleViewType) => void
}

export interface ViewTypeItem {
  view: ArticleViewType
  icon: React.FC<React.SVGProps<SVGSVGElement>> // Для SVG-иконок
}

const viewTypes: ViewTypeItem[] = [
  {
    view: ArticleViewType.CARD,
    icon: TiledIcon,
  },
  {
    view: ArticleViewType.LIST,
    icon: ListIcon,
  },
]

export const ArticleViewSelector: React.FC<ArticleViewSelectorProps> = memo(
  function ArticleViewSelector(props: ArticleViewSelectorProps) {
    const { className, onViewClick, view } = props

    const onClick = (newView: ArticleViewType) => () => {
      onViewClick?.(newView)
    }

    const renderButton = (viewType: ViewTypeItem) => {
      return (
        <Button key={viewType.view} buttonVar={ButtonVar.CLEAR} onClick={onClick(viewType.view)}>
          <Icon
            width={24}
            height={24}
            Svg={viewType.icon}
            className={cn("article-view-selector", [
              viewType.view !== view ? "article-view-selector__not-selected" : "",
            ])}
          />
        </Button>
      )
    }

    return (
      <div className={cn("article-view-selector", [className])}>{viewTypes.map(renderButton)}</div>
    )
  }
)
