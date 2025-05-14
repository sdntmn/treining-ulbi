import React, { memo } from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/classNames/classNames"
import { VStack } from "@/shared/ui/Stack"
import { TextParagraf, TextSize } from "@/shared/ui/TextParagraf"

import { ArticleList } from "@/entities/Article"

import { useArticleRecommendationsList } from "../../api/articleRecomendationsApi"

interface ArticleRecommendationListProps {
  className?: string
}

export const ArticleRecommendationList: React.FC<ArticleRecommendationListProps> =
  memo(function ArticleRecommendationList({
    className,
  }: ArticleRecommendationListProps) {
    const { t } = useTranslation("article")
    const {
      isLoading,
      data: recomendationArticles,
      error,
    } = useArticleRecommendationsList(3)

    if (!recomendationArticles || error) {
      return null
    }

    return (
      <VStack gap="8" className={cn("", [className])}>
        <TextParagraf size={TextSize.L} title={t("articleRecomendations")} />
        <ArticleList
          articles={recomendationArticles}
          isLoading={isLoading}
          target="_blank"
        />
      </VStack>
    )
  })
