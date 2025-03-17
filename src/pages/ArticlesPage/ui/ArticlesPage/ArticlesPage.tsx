/* eslint-disable max-len */
import { ArticleList } from "entities/Article"
import { memo, useCallback } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { cn } from "shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { Page } from "widgets/Page"

import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors"
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage"
import { initArticlePage } from "../../model/services/initArticlesPage/initArticlesPage"
import {
  articlesPageReducer,
  getArticles,
} from "../../model/slices/articlePageSlace"
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters"

import "./ArticlesPage.module.scss"

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch()
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const error = useSelector(getArticlesPageError)
  const [searchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlePage(searchParams))
  })

  if (error) {
    return <div>Что то пошло не так ...</div>
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={cn("articles-page", [className])}
      >
        <ArticlesPageFilters />
        <ArticleList
          className={cn(`articles-page__${view}`, [className])}
          isLoading={isLoading}
          view={view}
          articles={articles}
          target="_blank"
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
