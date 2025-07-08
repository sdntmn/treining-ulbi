/* eslint-disable max-len */
import React, { lazy, memo, useCallback } from "react"
import { useSearchParams } from "react-router-dom"

import { StickyContentLayout } from "@/shared/layouts/StickyContentLayout"
import { cn } from "@/shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect"

import { ArticlePageGreeting } from "@/features/ArticlePageGreeting"

import { Page } from "@/widgets/Page"

import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage"
import { initArticlePage } from "../../model/services/initArticlesPage/initArticlesPage"
import { articlesPageReducer } from "../../model/slices/articlePageSlace"
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList"
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters"
import { FiltersContainer } from "../FiltersContainer/FiltersContainer"
import { ViewSelectorContainer } from "../ViewSelectorContainer/ViewSelectorContainer"
import "./ArticlesPage.module.scss"

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlePage(searchParams))
  })

  const content = (
    <ToggleFeaturesComponent
      feature={"isAppRedesigned"}
      on={
        <StickyContentLayout
          left={<ViewSelectorContainer />}
          right={<FiltersContainer />}
          content={
            <Page
              data-testid="ArticlesPage"
              onScrollEnd={onLoadNextPart}
              className={cn("articles-page-redesign", [className])}
            >
              <ArticleInfiniteList className="articles-page-redesign__list" />
              <ArticlePageGreeting />
            </Page>
          }
        />
      }
      off={
        <Page
          data-testid="ArticlesPage"
          onScrollEnd={onLoadNextPart}
          className={cn("articles-page", [className])}
        >
          <ArticlesPageFilters />
          <ArticleInfiniteList className="articles-page__list" />
          <ArticlePageGreeting />
        </Page>
      }
    />
  )

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
export const ArticlesPageAsync = lazy(() => import("./ArticlesPage"))
