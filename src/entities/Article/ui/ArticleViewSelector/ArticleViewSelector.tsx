import React, { memo } from "react"
import TiledIcon from "shared/assets/icons/card.svg"
import ListIcon from "shared/assets/icons/list.svg"
import { cn } from "shared/lib/classNames/classNames"
import { Button, ButtonVar } from "shared/ui/Button/Button"
import { Icon } from "shared/ui/Icon/Icon"

import { ArticleViewType } from "../../model/types/article"

import "./ArticleViewSelector.module.scss"

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleViewType
  onViewClick?: (view: ArticleViewType) => void
}

const viewTypes = [
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
    const { className, onViewClick } = props

    const onClick = (newView: ArticleViewType) => () => {
      onViewClick?.(newView)
    }

    return (
      <div className={cn("article-view-selector", [className])}>
        {viewTypes.map((viewType) => {
          return (
            <Button
              key={viewType.view}
              buttonVar={ButtonVar.CLEAR}
              onClick={onClick(viewType.view)}
            >
              <Icon Svg={viewType.icon} className={cn("", [])} />
            </Button>
          )
        })}
      </div>
    )
  }
)
