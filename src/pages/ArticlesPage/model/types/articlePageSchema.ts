import { EntityState } from "@reduxjs/toolkit"

import { Article, ArticleSortField, ArticleType, ArticleViewType } from "@/entities/Article"

import type { SortOrder } from "@/shared/types/sort"

export interface ArticlesPageSchema extends EntityState<Article, string> {
  isLoading?: boolean
  error?: string

  // pagination
  page: number
  limit: number
  hasMore: boolean

  // filters: Record<string, string[]>
  view: ArticleViewType
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType

  _inited?: boolean
}
