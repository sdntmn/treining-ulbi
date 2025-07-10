import { memo, useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { routePatch } from "@/shared/lib/helpers/getPath"
import { Card } from "@/shared/ui/redesigned/Card"

import { getArticleDetailsData } from "@/entities/Article"

import { ArticleAdditionalInfo } from "@/widgets/ArticleAdditionalInfo"

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData)

  const navigate = useNavigate()

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(routePatch.articleEdit(article.id))
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
