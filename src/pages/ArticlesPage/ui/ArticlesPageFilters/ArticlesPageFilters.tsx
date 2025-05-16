import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { cn } from "@/shared/lib/classNames/classNames"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce"
import { SortOrder } from "@/shared/types/sort"
import { Card } from "@/shared/ui/Card"
import { Input } from "@/shared/ui/Input"

import {
  ArticleSortField,
  ArticleViewType,
  ArticleType,
} from "@/entities/Article"

import { ArticleSortSelector } from "@/features/ArticleSortSelector"
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs"
import { ArticleViewSelector } from "@/features/ArticleViewSelector"

import {
  getArticlesPageView,
  getArticlesPageOrder,
  getArticlesPageSort,
  getArticlesPageSearch,
  getArticlesPageType,
} from "../../model/selectors/articlesPageSelectors"
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList"
import { articlesPageActions } from "../../model/slices/articlePageSlace"

import "./ArticlesPageFilters.module.scss"

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters: React.FC<ArticlesPageFiltersProps> = memo(
  function ArticlesPageFilters(props: ArticlesPageFiltersProps) {
    const { className } = props
    const { t } = useTranslation("article")
    const dispatch = useAppDispatch()
    const viewArticle = useSelector(getArticlesPageView)
    const sort = useSelector(getArticlesPageSort)
    const order = useSelector(getArticlesPageOrder)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)

    const fetchData = useCallback(() => {
      dispatch(fetchArticlesList({ replace: true }))
    }, [dispatch])

    const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback(
      (view: ArticleViewType) => {
        dispatch(articlesPageActions.setView(view))
      },
      [dispatch]
    )

    const onChangeSort = useCallback(
      (newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
      },
      [dispatch, fetchData]
    )

    const onChangeOrder = useCallback(
      (newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
      },
      [dispatch, fetchData]
    )

    const onChangeSearch = useCallback(
      (search: string) => {
        dispatch(articlesPageActions.setSearch(search))
        dispatch(articlesPageActions.setPage(1))
        debouncedFetchData()
      },
      [debouncedFetchData, dispatch]
    )

    const onChangeType = useCallback(
      (value: ArticleType) => {
        dispatch(articlesPageActions.setType(value))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
      },
      [fetchData, dispatch]
    )

    return (
      <div className={cn("articles-page-filters", [className])}>
        <div className="articles-page-filters__sort-wrapper">
          <ArticleSortSelector
            sort={sort}
            order={order}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />
          <ArticleViewSelector view={viewArticle} onViewClick={onChangeView} />
        </div>
        <Card className="articles-page-filters__search">
          <Input
            onChange={onChangeSearch}
            value={search}
            placeholder={t("articlePlaceholderSearch")}
          />
        </Card>
        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={"articles-page-filters__tabs"}
        />
      </div>
    )
  }
)
