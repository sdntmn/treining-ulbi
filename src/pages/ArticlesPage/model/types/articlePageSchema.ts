import { EntityState } from "@reduxjs/toolkit"
import { Article, ArticleViewType } from "entities/Article"

export interface ArticlesPageSchema extends EntityState<Article, string> {
  isLoading?: boolean
  error?: string

  // pagination
  page: number
  limit: number
  hasMore: boolean

  filters: Record<string, string[]>
  view: ArticleViewType
  // order: SortOrder
  // sort: ArticleSortField
  search: string

  _inited?: boolean
}
