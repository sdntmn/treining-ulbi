import React, { memo, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { TextParagraf } from "@/shared/ui/deprecated/TextParagraf"

import { ArticleList } from "@/entities/Article"

import { useArticlesLimit } from "../../lib/hooks/useArticleLimit/useArticleLimit"
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors"
import { articlesPageActions, getArticles } from "../../model/slices/articlePageSlace"

interface ArticleInfiniteListProps {
  className?: string
}

export const ArticleInfiniteList: React.FC<ArticleInfiniteListProps> = memo(
  function ArticleInfiniteList({ className }: ArticleInfiniteListProps) {
    const dispatch = useAppDispatch()
    const { t } = useTranslation("article")
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const view = useSelector(getArticlesPageView)
    const error = useSelector(getArticlesPageError)

    const dynamicLimit = useArticlesLimit(view)

    useEffect(() => {
      dispatch(articlesPageActions.setLimit(dynamicLimit))
    }, [dynamicLimit, dispatch])

    if (error) {
      return <TextParagraf text={t("articleErrorLoading")} />
    }

    return (
      <ArticleList isLoading={isLoading} view={view} articles={articles} className={className} />
    )
  }
)
