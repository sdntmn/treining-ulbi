import React, { lazy, memo } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { cn } from "@/shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { toggleFeatures } from "@/shared/lib/features"
import { Card } from "@/shared/ui/Card"

import { ArticleDetails } from "@/entities/Article"

import { ArticleRating } from "@/features/ArticleRating"
import { ArticleRecommendationList } from "@/features/ArticleRecommendationList"

import { Page } from "@/widgets/Page"

import { articleDetailsPageReducer } from "../../model/slice"
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments"
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader"

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

  const articleRatingСard = toggleFeatures({
    name: "isArticleRatingEnabled",
    on: () => <ArticleRating articleId={id!} />,
    off: () => <Card> 123 </Card>,
  })

  if (!id) {
    return <Page>{t("articleDetailsPage")}</Page>
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={cn("article-details-page", [className])}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        {articleRatingСard}
        <ArticleRecommendationList />
        <ArticleDetailsComments id={id} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
export const ArticleDetailsPageAsync = lazy(() => import("./ArticleDetailsPage"))
