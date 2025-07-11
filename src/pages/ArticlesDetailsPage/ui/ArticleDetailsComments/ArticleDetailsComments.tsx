/* eslint-disable max-len */
import React, { memo, Suspense, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect"
import { TextParagraf as TextParagrafDeprecated } from "@/shared/ui/deprecated/TextParagraf"
import { VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

import { CommentList } from "@/entities/Comment"

import { AddCommentForm } from "@/features/AddCommentForm"

import { getArticleCommentsIsLoading } from "../../model/selectors/comments"
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle"
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { getArticleComments } from "../../model/slice/articleDetailsCommentsSlice"

interface ArticleDetailsCommentsProps {
  id: string
}

export const ArticleDetailsComments: React.FC<ArticleDetailsCommentsProps> = memo(
  function ArticleDetailsComments(props: ArticleDetailsCommentsProps) {
    const dispatch = useAppDispatch()
    const { id } = props
    const { t } = useTranslation("article")
    const comments = useSelector(getArticleComments.selectAll)
    const isLoadingComments = useSelector(getArticleCommentsIsLoading)

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text))
      },
      [dispatch]
    )

    useInitialEffect(() => {
      if (!id) return
      dispatch(fetchCommentsByArticleId(id))
    })

    return (
      <VStack gap="16" max>
        <ToggleFeaturesComponent
          feature="isAppRedesigned"
          on={<Text size={"l"} title={t("articleComments")} />}
          off={<TextParagrafDeprecated title={t("articleComments")} />}
        />
        <Suspense fallback={<TextParagrafDeprecated text={t("articleCommentsLoading")} />}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>
        <CommentList isLoading={isLoadingComments} comments={comments} />
      </VStack>
    )
  }
)
