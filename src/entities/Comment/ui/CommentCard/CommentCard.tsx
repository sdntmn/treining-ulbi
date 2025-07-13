import React, { memo } from "react"

import { getRouteProfile } from "@/shared/const/routes"
import { cn } from "@/shared/lib/classNames/classNames"
import { toggleFeatures, ToggleFeaturesComponent } from "@/shared/lib/features"
import { AppLink as AppLinkDeprecated } from "@/shared/ui/deprecated/AppLink"
import { Avatar } from "@/shared/ui/deprecated/Avatar"
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton"
import { TextParagraf as TextParagrafDeprecated } from "@/shared/ui/deprecated/TextParagraf"
import { AppLink } from "@/shared/ui/redesigned/AppLink"
import { Card } from "@/shared/ui/redesigned/Card"
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton"
import { VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

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

  const Skeleton = toggleFeatures({
    name: "isAppRedesigned",
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  })

  if (isLoading) {
    return (
      <VStack
        gap="8"
        max
        data-testid={"CommentCard.Loading"}
        className={cn("comment-card", [className, isLoading && "comment-card__loading"])}
      >
        <div className="comment-card__header">
          <Skeleton width={30} height={30} border="50%" />

          <Skeleton height={16} width={100} className="comment-card__username" />
        </div>

        <Skeleton className="comment-card__text" width="100%" height={50} />
      </VStack>
    )
  }

  if (!comment) {
    return null
  }

  return (
    <ToggleFeaturesComponent
      feature="isAppRedesigned"
      on={
        <Card padding="24" border="round" max>
          <VStack
            data-testid={"CommentCard.Content"}
            gap="8"
            max
            className={cn("comment-card", [className])}
          >
            <AppLink to={getRouteProfile(comment.user.id)} className="comment-card__header">
              {comment?.user?.avatar ? <Avatar size={30} src={comment?.user?.avatar} /> : null}

              <Text className="comment-card__username" bold title={comment?.user?.username} />
            </AppLink>

            <Text className="comment-card__text" text={comment?.text} />
          </VStack>
        </Card>
      }
      off={
        <VStack
          data-testid={"CommentCard.Content"}
          gap="8"
          max
          className={cn("comment-card-deprecated", [className])}
        >
          <AppLinkDeprecated
            to={getRouteProfile(comment.user.id)}
            className="comment-card-deprecated__header"
          >
            {comment?.user?.avatar ? <Avatar size={30} src={comment?.user?.avatar} /> : null}

            <TextParagrafDeprecated
              className="comment-card-deprecated__username"
              title={comment?.user?.username}
            />
          </AppLinkDeprecated>

          <TextParagrafDeprecated className="comment-card-deprecated__text" text={comment?.text} />
        </VStack>
      }
    />
  )
})
