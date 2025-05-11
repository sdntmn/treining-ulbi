import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { ArticleList } from "@/entities/Article"
import { TextParagraf } from "@/shared/ui/TextParagraf/TextParagraf"

import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors"
import { getArticles } from "../../model/slices/articlePageSlace"

interface ArticleInfiniteListProps {
  className?: string
}

export const ArticleInfiniteList: React.FC<ArticleInfiniteListProps> = memo(
  function ArticleInfiniteList({ className }: ArticleInfiniteListProps) {
    const { t } = useTranslation("article")
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const view = useSelector(getArticlesPageView)
    const error = useSelector(getArticlesPageError)

    if (error) {
      return <TextParagraf text={t("articleErrorLoading")} />
    }

    return (
      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
        className={className}
      />
    )
  }
)
