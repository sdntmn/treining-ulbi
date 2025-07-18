import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getRouteArticleEdit, getRouteArticles } from "@/shared/const/routes"
import { cn } from "@/shared/lib/classNames/classNames"
import { Button, ButtonVar } from "@/shared/ui/deprecated/Button"
import { HStack } from "@/shared/ui/redesigned/Stack"

import { getArticleDetailsData } from "@/entities/Article"

import { getCanEditArticle } from "../../model/selectors/article"

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader: React.FC<ArticleDetailsPageHeaderProps> = memo(
  function ArticleDetailsPageHeader({ className }: ArticleDetailsPageHeaderProps) {
    const { t } = useTranslation("article")
    const navigate = useNavigate()
    const canEdit = useSelector(getCanEditArticle)
    const article = useSelector(getArticleDetailsData)

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles()) // Используем хелпер для пути к списку статей
    }, [navigate])

    const onEditArticle = useCallback(() => {
      if (article?.id) {
        navigate(getRouteArticleEdit(article.id)) // Используем хелпер для пути редактирования
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
  }
)
