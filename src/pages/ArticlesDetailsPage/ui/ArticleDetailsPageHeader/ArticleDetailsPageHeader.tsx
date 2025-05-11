import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getArticleDetailsData } from "@/entities/Article/model/selectors/articleDetails"
import { cn } from "@/shared/lib/classNames/classNames"
import { routePatch } from "@/shared/lib/helpers/getPath"
import { Button, ButtonVar } from "@/shared/ui/Button/Button"
import { HStack } from "@/shared/ui/Stack"

import { getCanEditArticle } from "../../model/selectors/article"

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader: React.FC<ArticleDetailsPageHeaderProps> =
  memo(function ArticleDetailsPageHeader({
    className,
  }: ArticleDetailsPageHeaderProps) {
    const { t } = useTranslation("article")
    const navigate = useNavigate()
    const canEdit = useSelector(getCanEditArticle)
    const article = useSelector(getArticleDetailsData)

    const onBackToList = useCallback(() => {
      navigate(routePatch.articles()) // Используем хелпер для пути к списку статей
    }, [navigate])

    const onEditArticle = useCallback(() => {
      if (article?.id) {
        navigate(routePatch.articleEdit(article.id)) // Используем хелпер для пути редактирования
      }
    }, [article?.id, navigate])

    return (
      <HStack max justify="between" className={cn("", [className])}>
        <Button buttonVar={ButtonVar.OUTLINE} onClick={onBackToList}>
          {t("articleBtnBackToList")}
        </Button>

        {canEdit && (
          <Button buttonVar={ButtonVar.OUTLINE} onClick={onEditArticle}>
            {t("articleBtnEditing")}
          </Button>
        )}
      </HStack>
    )
  })
