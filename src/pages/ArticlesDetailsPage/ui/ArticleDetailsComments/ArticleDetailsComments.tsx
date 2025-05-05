/* eslint-disable max-len */
import { CommentList } from "entities/Comment"
import { AddCommentForm } from "features/AddCommentForm"
import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { VStack } from "shared/ui/Stack"
import { TextParagraf } from "shared/ui/TextParagraf/TextParagraf"

import { getArticleCommentsIsLoading } from "../../model/selectors/comments"
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle"
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice"

interface ArticleDetailsCommentsProps {
  id: string
}

export const ArticleDetailsComments: React.FC<ArticleDetailsCommentsProps> =
  memo(function ArticleDetailsComments(props: ArticleDetailsCommentsProps) {
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
      <VStack gap="16">
        <TextParagraf title={t("articleComments")} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={isLoadingComments} comments={comments} />
      </VStack>
    )
  })
