import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { Skeleton } from "@/shared/ui/Skeleton"

import { RatingCard } from "@/entities/Rating"
import { getUserAuthData } from "@/entities/User"

import { useGetArticleRating, useRateArticle } from "../../api/articleRatingApi"

export interface ArticleRatingProps {
  className?: string
  articleId: string
}

const ArticleRating: React.FC<ArticleRatingProps> = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props
  const { t } = useTranslation()
  const userData = useSelector(getUserAuthData)

  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? "",
  })

  const [rateArticleMutation] = useRateArticle()

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? "",
          articleId,
          rate: starsCount,
          feedback,
        })
      } catch (e) {
        console.log(e)
      }
    },
    [articleId, rateArticleMutation, userData?.id]
  )

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback)
    },
    [handleRateArticle]
  )

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount)
    },
    [handleRateArticle]
  )

  if (isLoading) {
    return <Skeleton width="100%" height={120} />
  }

  const rating = data?.[0]

  return (
    <RatingCard
      onCancel={onCancel}
      onAccept={onAccept}
      rate={rating?.rate}
      className={className}
      title={t("Оцените статью")}
      feedbackTitle={t("Оставьте свой отзыв о статье, это поможет улучшить качество")}
      hasFeedback
    />
  )
})

ArticleRating.displayName = "ArticleRating"
export default ArticleRating
