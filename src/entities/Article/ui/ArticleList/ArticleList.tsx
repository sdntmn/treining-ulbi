import { useVirtualizer } from "@tanstack/react-virtual"
import React, { HTMLAttributeAnchorTarget, useEffect, useMemo, useRef, useState } from "react"

import { PAGE_ID } from "@/shared/const/string"
import { toggleFeatures } from "@/shared/lib/features"
import { useWindowSize } from "@/shared/lib/hooks/useWindowsSize/useWindowsSize"

import { ArticleViewType } from "../../model/consts"
import { ArticleListItem } from "../ArticleListItem/ArticleListItem"
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton"

import type { Article } from "../../model/types"

import "./ArticleList.module.scss"

interface ArticleListProps {
  articles: Article[]
  className?: string
  isLoading?: boolean
  target?: HTMLAttributeAnchorTarget
  view?: ArticleViewType
}

const getSkeletons = (view: ArticleViewType) =>
  new Array(view === ArticleViewType.CARD ? 15 : 3)
    .fill(0)
    .map((_item, index) => <ArticleListItemSkeleton key={`skeleton-${index}`} view={view} />)

export const ArticleList: React.FC<ArticleListProps> = (props: ArticleListProps) => {
  const { articles, isLoading, view = ArticleViewType.CARD, target } = props

  const { windowWidth } = useWindowSize()

  const [containerWidth, setContainerWidth] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  const baseConfigRedesigned = {
    [ArticleViewType.CARD]: {
      itemHeight: 342,
      rowHeight: 358,
    },
    [ArticleViewType.LIST]: {
      itemsPerRow: 1,
      itemHeight: 782,
      itemWidth: "100%",
      rowHeight: 796,
    },
  }

  const baseConfigDeprecated = {
    [ArticleViewType.CARD]: {
      itemHeight: 293,
      rowHeight: 323,
    },
    [ArticleViewType.LIST]: {
      itemsPerRow: 1,
      itemHeight: 647,
      itemWidth: "100%",
      rowHeight: 677,
    },
  }

  const configBase = toggleFeatures({
    name: "isAppRedesigned",
    on: () => baseConfigRedesigned,
    off: () => baseConfigDeprecated,
  })

  const getConfig = useMemo(() => {
    if (view === ArticleViewType.LIST) {
      return configBase[ArticleViewType.LIST]
    }

    const minCardWidth = toggleFeatures({
      name: "isAppRedesigned",
      on: () => 240,
      off: () => 230,
    })

    // Рассчитываем количество карточек в ряду
    // const minCardWidth = 250 // Минимальная ширина карточки
    const gap = 16 // Отступ между карточками
    const itemsPerRow = Math.max(1, Math.floor((containerWidth + gap) / (minCardWidth + gap)))

    return {
      ...configBase[ArticleViewType.CARD],
      itemsPerRow,
      itemWidth: `calc(${100 / itemsPerRow}% - ${gap}px)`,
    }
  }, [view, containerWidth, configBase])

  // const currentConfig = config[view]
  const rowCount = Math.ceil(articles.length / getConfig.itemsPerRow)

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => document.getElementById(PAGE_ID),
    estimateSize: () => getConfig.rowHeight,
    overscan: 5,
    paddingStart: 0,
    paddingEnd: 16,
  })

  const renderRow = (rowIndex: number) => {
    const startIndex = rowIndex * getConfig.itemsPerRow
    const endIndex = Math.min(startIndex + getConfig.itemsPerRow, articles.length)
    const rowItems = articles.slice(startIndex, endIndex)
    const isLastRow = rowIndex === rowCount - 1
    const itemsInLastRow = articles.length % getConfig.itemsPerRow
    const minCardWidth = toggleFeatures({
      name: "isAppRedesigned",
      on: () => 240,
      off: () => 230,
    })

    return (
      <div
        key={rowIndex}
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "16px",
          height: `${getConfig.rowHeight}px`,
          justifyContent: isLastRow && itemsInLastRow > 0 ? "flex-start" : "space-between",
        }}
        data-testid={"ArticleList"}
      >
        {rowItems.map((article) => (
          <div
            key={article.id}
            style={{
              flex: isLastRow && itemsInLastRow > 0 ? "0 1 auto" : 1,
              width: getConfig.itemWidth,
              minWidth: `${minCardWidth}px`, // Минимальная ширина карточки
            }}
          >
            <ArticleListItem article={article} view={view} target={target} />
          </div>
        ))}
        {/* Добавляем пустые элементы для выравнивания неполных рядов */}
        {isLastRow &&
          itemsInLastRow > 0 &&
          Array(getConfig.itemsPerRow - itemsInLastRow)
            .fill(0)
            .map((_, index) => (
              <div
                key={`empty-${index}`}
                style={{
                  width: getConfig.itemWidth,
                  flex: 1,
                  visibility: "hidden",
                }}
              />
            ))}
      </div>
    )
  }

  useEffect(() => {
    if (containerRef.current && windowWidth) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [windowWidth])

  return (
    <>
      <div
        ref={containerRef}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
          width: "100%",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {renderRow(virtualRow.index)}
          </div>
        ))}
      </div>

      {/* Скелетоны теперь рендерятся после основного списка */}
      {isLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: view === ArticleViewType.CARD ? "row" : "column",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {getSkeletons(view)}
        </div>
      )}
    </>
  )
}
