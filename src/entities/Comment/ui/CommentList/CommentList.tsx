import React, { memo } from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/classNames/classNames"
import { VStack } from "@/shared/ui/Stack"
import { TextParagraf } from "@/shared/ui/TextParagraf/TextParagraf"

import { Comment } from "../../model/types/comment"
import { CommentCard } from "../CommentCard/CommentCard"

import "./CommentList.module.scss"
interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList: React.FC<CommentListProps> = memo(
  function CommentList(props: CommentListProps) {
    const { t } = useTranslation("comments")
    const { className, isLoading, comments } = props

    if (isLoading) {
      return (
        <VStack gap="8" max className={cn("", [className])}>
          <CommentCard isLoading />
          <CommentCard isLoading />
          <CommentCard isLoading />
        </VStack>
      )
    }

    return (
      <VStack gap="16" max className={cn("comment-list", [className])}>
        {comments?.length ? (
          comments.map((comment) => (
            <CommentCard
              key={comment?.id}
              isLoading={isLoading}
              className="comment-list__card"
              comment={comment}
            />
          ))
        ) : (
          <TextParagraf text={t("noComments")} />
        )}
      </VStack>
    )
  }
)
