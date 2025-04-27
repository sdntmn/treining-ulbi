/* eslint-disable max-len */
import { ArticleDetails, ArticleList } from "entities/Article"
import { getArticleDetailsIsLoading } from "entities/Article/model/selectors/articleDetails"
import { CommentList } from "entities/Comment"
import { AddCommentForm } from "features/AddCommentForm"
import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { cn } from "shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { TextParagraf, TextSize } from "shared/ui/TextParagraf/TextParagraf"
import { Page } from "widgets/Page"

import { getArticleRecommendationsIsLoading } from "../../model/selectors/recommendations"
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle"
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations"
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { articleDetailsPageReducer } from "../../model/slices"
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice"
import { getArticleRecommendations } from "../../model/slices/articleDetailsPageRecommendationsSlice"
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader"

import "./ArticleDetailsPage.module.scss"

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({
  className,
}: ArticleDetailsPageProps) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation("article")
  const { id } = useParams<{ id: string }>()

  const comments = useSelector(getArticleComments.selectAll)
  const recommendations = useSelector(getArticleRecommendations.selectAll)

  const isLoadingComments = useSelector(getArticleDetailsIsLoading)
  const isLoadingRecommendations = useSelector(
    getArticleRecommendationsIsLoading
  )

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text))
    },
    [dispatch]
  )

  useInitialEffect(() => {
    if (!id) return
    dispatch(fetchArticleRecommendations())
    dispatch(fetchCommentsByArticleId(id))
  })

  if (!id) {
    return <Page>{t("articleDetailsPage")}</Page>
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={cn("article-details-page", [className])}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <TextParagraf
          size={TextSize.L}
          className={cn("article-details-page__comments", [className])}
          title={t("articleRecomendations")}
        />

        <ArticleList
          articles={recommendations}
          isLoading={isLoadingRecommendations}
          className={"article-details-page__recommendations"}
          target="_blank"
        />
        <TextParagraf
          className={cn("article-details-page__comments", [className])}
          title={t("articleComments")}
        />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isLoadingComments} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
