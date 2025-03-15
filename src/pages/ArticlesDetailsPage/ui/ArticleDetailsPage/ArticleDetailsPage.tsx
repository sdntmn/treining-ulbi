import { createSelector } from "@reduxjs/toolkit"
/* eslint-disable max-len */
import { ArticleDetails } from "entities/Article"
import { getArticleDetailsIsLoading } from "entities/Article/model/selectors/articleDetails"
import { CommentList } from "entities/Comment"
import { AddCommentForm } from "features/AddCommentForm"
import { addCommentForArticle } from "pages/ArticlesDetailsPage/model/services/addCommentForArticle/addCommentForArticle"
import React, { memo, useCallback, useMemo } from "react"
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
import { TextParagraf } from "shared/ui/TextParagraf/TextParagraf"
import { Page } from "widgets/Page"

import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "../../model/slices/articleDetailsCommentsSlice"

import "./ArticleDetailsPage.module.scss"

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({
  className,
}: ArticleDetailsPageProps) => {
  const { t } = useTranslation("articleDetailsPage")
  const { id } = useParams<keyof { id: string }>()
  const comments = useSelector(
    useMemo(
      () =>
        createSelector(getArticleComments.selectAll, (comments) =>
          comments.filter((c) => c.id === id)
        ),
      [id]
    )
  )
  const isLoadingComments = useSelector(getArticleDetailsIsLoading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    if (id) {
      dispatch(fetchCommentsByArticleId(id))
    }
  })

  if (!id) {
    return <Page>{t("articleNotFound")}</Page>
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={cn("article-details-page", [className])}>
        <Button buttonVar={ButtonVar.OUTLINE} onClick={onBackToList}>
          {t("articleBtnBackToList")}
        </Button>
        <ArticleDetails id={id} />
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
