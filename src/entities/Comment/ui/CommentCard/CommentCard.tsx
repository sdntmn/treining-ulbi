import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { routePatch } from "@/shared/lib/helpers/getPath"
import { AppLink } from "@/shared/ui/AppLink"
import { Avatar } from "@/shared/ui/Avatar"
import { Skeleton } from "@/shared/ui/Skeleton"
import { VStack } from "@/shared/ui/Stack"
import { TextParagraf } from "@/shared/ui/TextParagraf"

import { Comment } from "../../model/types/comment"

import "./CommentCard.module.scss"

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
}

export const CommentCard: React.FC<CommentCardProps> = memo(function CommentCard(
  props: CommentCardProps
) {
  const { className, comment, isLoading } = props

  if (isLoading) {
    return (
      <div className={cn("comment-card", [className, isLoading && "comment-card__loading"])}>
        <div className="comment-card__header">
          <Skeleton width={30} height={30} border="50%" />

          <Skeleton height={16} width={100} className="comment-card__username" />
        </div>

        <Skeleton className="comment-card__text" width="100%" height={50} />
      </div>
    )
  }

  if (!comment) {
    return null
  }

  return (
    <VStack gap="8" max className={cn("comment-card", [className])}>
      <AppLink to={routePatch.profile(comment?.user?.id)} className="comment-card__header">
        {comment?.user?.avatar ? <Avatar size={30} src={comment?.user?.avatar} /> : null}

        <TextParagraf className="comment-card__username" title={comment?.user?.username} />
      </AppLink>

      <TextParagraf className="comment-card__text" text={comment?.text} />
    </VStack>
  )
})
