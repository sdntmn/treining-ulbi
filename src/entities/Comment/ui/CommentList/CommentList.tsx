import { memo } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "shared/lib/classNames/classNames"
import { TextParagraf } from "shared/ui/TextParagraf/TextParagraf"

import { Comment } from "../../model/types/comment"
import { CommentCard } from "../CommentCard/CommentCard"

import "./CommentList.module.scss"

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = memo(function CommentList(props: CommentListProps) {
  const { t } = useTranslation("comments")
  const { className, isLoading, comments } = props

  if (isLoading) {
    return (
      <div className={cn("comment-list", [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    )
  }

  return (
    <div className={cn("comment-list", [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            isLoading={isLoading}
            className="comment-list__card"
            comment={comment}
          />
        ))
      ) : (
        <TextParagraf text={t("noComments")} />
      )}
    </div>
  )
})
