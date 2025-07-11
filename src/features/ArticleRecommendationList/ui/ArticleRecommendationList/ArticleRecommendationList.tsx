import React, { memo } from "react"
import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import {
  TextParagraf as TextParagrafDeprecated,
  TextSize,
} from "@/shared/ui/deprecated/TextParagraf"
import { VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

import { ArticleList, ArticleViewType } from "@/entities/Article"

import { useArticleRecommendationsList } from "../../api/articleRecomendationsApi"

interface ArticleRecommendationListProps {
  className?: string
}

export const ArticleRecommendationList: React.FC<ArticleRecommendationListProps> = memo(
  function ArticleRecommendationList({ className }: ArticleRecommendationListProps) {
    const { t } = useTranslation("article")
    const { isLoading, data: recomendationArticles, error } = useArticleRecommendationsList(3)

    if (!recomendationArticles || error) {
      return null
    }

    return (
      <VStack
        data-testid={"ArticleRecommendationsList"}
        gap="8"
        className={cn("", [className])}
        max
      >
        <ToggleFeaturesComponent
          feature="isAppRedesigned"
          on={<Text size={"l"} title={t("articleRecomendations")} />}
          off={<TextParagrafDeprecated size={TextSize.L} title={t("articleRecomendations")} />}
        />

        <ArticleList
          articles={recomendationArticles}
          isLoading={isLoading}
          target="_blank"
          view={ArticleViewType.CARD}
        />
      </VStack>
    )
  }
)
