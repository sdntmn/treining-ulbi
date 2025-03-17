/* eslint-disable max-len */
import { ArticleDetails, ArticleList } from "entities/Article"
import { getArticleDetailsIsLoading } from "entities/Article/model/selectors/articleDetails"
import { CommentList } from "entities/Comment"
import { AddCommentForm } from "features/AddCommentForm"
import { getArticleRecommendationsIsLoading } from "pages/ArticlesDetailsPage/model/selectors/recommendations"
import { addCommentForArticle } from "pages/ArticlesDetailsPage/model/services/addCommentForArticle/addCommentForArticle"
import { fetchArticleRecommendations } from "pages/ArticlesDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations"
import {
  articleDetailsPageRecommendationsReducer,
  getArticleRecommendations,
} from "pages/ArticlesDetailsPage/model/slices/articleDetailsPageRecommendationsSlice"
import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { RoutePath } from "shared/config/routerConfig/routerConfig"
import { cn } from "shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { Button, ButtonVar } from "shared/ui/Button/Button"
import { TextParagraf, TextSize } from "shared/ui/TextParagraf/TextParagraf"
import { Page } from "widgets/Page"

import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice"

import "./ArticleDetailsPage.module.scss"

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsPageRecommendationsReducer,
  articleDetailsRecomendation: articleDetailsPageRecommendationsReducer,
}

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({
  className,
}: ArticleDetailsPageProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation("article")
  const { id } = useParams<{ id: string }>()
  console.info("Id from useParams:", id)

  const comments = useSelector(getArticleComments.selectAll)
  const recommendations = useSelector(getArticleRecommendations.selectAll)
  console.log("Recommendations from recommendations:", recommendations)
  console.log("Recommendations from comments:", comments)

  const isLoadingComments = useSelector(getArticleDetailsIsLoading)
  const isLoadingRecommendations = useSelector(
    getArticleRecommendationsIsLoading
  )

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

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
        <Button buttonVar={ButtonVar.OUTLINE} onClick={onBackToList}>
          {t("articleBtnBackToList")}
        </Button>
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
