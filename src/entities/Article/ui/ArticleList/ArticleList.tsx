import type { Article } from "../../model/types"

import { useVirtualizer } from "@tanstack/react-virtual"
import React, { HTMLAttributeAnchorTarget, useRef } from "react"

import { PAGE_ID } from "@/widgets/Page"

import { ArticleViewType } from "../../model/consts"
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
      <ArticleListItemSkeleton key={`skeleton-${index}`} view={view} />
    )
  )
  return skeletons
}

export const ArticleList: React.FC<ArticleListProps> = (
  props: ArticleListProps
) => {
  const { articles, isLoading, view = ArticleViewType.CARD, target } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const config = {
    [ArticleViewType.CARD]: {
      itemsPerRow: 3,
      itemHeight: 300,
      itemWidth: undefined, // будет рассчитываться автоматически
      rowHeight: 320,
    },
    [ArticleViewType.LIST]: {
      itemsPerRow: 1,
      itemHeight: 150,
      itemWidth: "100%",
      rowHeight: 640,
    },
  }

  const currentConfig = config[view]
  const rowCount = Math.ceil(articles.length / currentConfig.itemsPerRow)

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => document.getElementById(PAGE_ID),
    estimateSize: () => currentConfig.rowHeight,
    overscan: 5,
    paddingStart: 20,
    paddingEnd: 20,
  })

  const renderRow = (rowIndex: number) => {
    const startIndex = rowIndex * currentConfig.itemsPerRow
    const endIndex = Math.min(
      startIndex + currentConfig.itemsPerRow,
      articles.length
    )
    const rowItems = articles.slice(startIndex, endIndex)

    return (
      <div
        key={rowIndex}
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "16px",
          height: `${currentConfig.rowHeight}px`,
        }}
      >
        {rowItems.map((article) => (
          <div
            key={article.id}
            style={{
              flex: currentConfig.itemsPerRow > 1 ? 1 : undefined,
              width: currentConfig.itemWidth,
            }}
          >
            <ArticleListItem
              article={article}
              view={view}
              className="article-list__item"
              target={target}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
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

      {isLoading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {getSkeletons(view)}
        </div>
      )}
    </div>
  )
}
