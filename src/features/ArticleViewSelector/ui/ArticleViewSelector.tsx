import React, { memo } from "react"

import ListIcon from "@/shared/assets/icons/burger.svg"
import TiledIconDeprecated from "@/shared/assets/icons/card.svg"
import ListIconDeprecated from "@/shared/assets/icons/list.svg"
import TiledIcon from "@/shared/assets/icons/tile.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { toggleFeatures, ToggleFeaturesComponent } from "@/shared/lib/features"
import { Button as ButtonDeprecated, ButtonVar } from "@/shared/ui/deprecated/Button"
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon"
import { Card } from "@/shared/ui/redesigned/Card"
import { Icon } from "@/shared/ui/redesigned/Icon"
import { HStack } from "@/shared/ui/redesigned/Stack"

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
    view: ArticleViewType.LIST,
    icon: toggleFeatures({
      name: "isAppRedesigned",
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
  {
    view: ArticleViewType.CARD,
    icon: toggleFeatures({
      name: "isAppRedesigned",
      on: () => TiledIcon,
      off: () => TiledIconDeprecated,
    }),
  },
]

export const ArticleViewSelector: React.FC<ArticleViewSelectorProps> = memo(
  function ArticleViewSelector(props: ArticleViewSelectorProps) {
    const { className, onViewClick, view } = props

    const onClick = (newView: ArticleViewType) => () => {
      onViewClick?.(newView)
    }

    return (
      <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={
          <Card
            className={cn(
              "article-view-selector-redesigned",

              [className]
            )}
            border="round"
          >
            <HStack gap="8">
              {viewTypes.map((viewType) => (
                <Icon
                  key={viewType.view}
                  Svg={viewType.icon}
                  onClick={onClick(viewType.view)}
                  className={cn("", [
                    viewType.view !== view && "article-view-selector-redesigned__not-selected",
                  ])}
                />
              ))}
            </HStack>
          </Card>
        }
        off={
          <div className={cn("article-view-selector", [className])}>
            {viewTypes.map((viewType) => (
              <ButtonDeprecated
                key={viewType.view}
                buttonVar={ButtonVar.CLEAR}
                onClick={onClick(viewType.view)}
              >
                <IconDeprecated
                  width={24}
                  height={24}
                  Svg={viewType.icon}
                  className={cn("article-view-selector", [
                    viewType.view !== view ? "article-view-selector__not-selected" : "",
                  ])}
                />
              </ButtonDeprecated>
            ))}
          </div>
        }
      />
    )
  }
)
