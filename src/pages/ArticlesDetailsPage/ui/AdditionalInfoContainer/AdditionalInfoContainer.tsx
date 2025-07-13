import { memo, useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getRouteArticleEdit } from "@/shared/const/routes"
import { Card } from "@/shared/ui/redesigned/Card"

import { getArticleDetailsData } from "@/entities/Article"

import { ArticleAdditionalInfo } from "@/widgets/ArticleAdditionalInfo"

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData)

  const navigate = useNavigate()

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id))
    }
  }, [article, navigate])

  if (!article) {
    return null
  }

  return (
    <Card padding="24" border="round" className={"additional-info-container"}>
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  )
})

AdditionalInfoContainer.displayName = "AdditionalInfoContainer"
