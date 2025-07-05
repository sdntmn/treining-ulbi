/* eslint-disable max-len */
import React, { lazy, memo } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { cn } from "@/shared/lib/classNames/classNames"
import { DynamicModuleLoader } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { Card } from "@/shared/ui/Card"

import { ArticleDetails } from "@/entities/Article"

import { ArticleRating } from "@/features/ArticleRating"
import { ArticleRecommendationList } from "@/features/ArticleRecommendationList"

import { Page } from "@/widgets/Page"

import { articleDetailsPageReducer } from "../../model/slice"
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments"
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader"

import type { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"

import "./ArticleDetailsPage.module.scss"

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({
  className,
}: ArticleDetailsPageProps) => {
  const { t } = useTranslation("article")
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <Page>{t("articleDetailsPage")}</Page>
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={cn("article-details-page", [className])}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <ToggleFeaturesComponent
          feature={"isArticleRatingEnabled"}
          on={<ArticleRating articleId={id!} />}
          off={<Card> 123 </Card>}
        />
        <ArticleRating articleId={id} />
        <ArticleRecommendationList />
        <ArticleDetailsComments id={id} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
export const ArticleDetailsPageAsync = lazy(() => import("./ArticleDetailsPage"))
