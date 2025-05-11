import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { cn } from "@/shared/lib/classNames/classNames"
import { Page } from "@/widgets/Page"

import "./ArticleEditPage.module.scss"

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage: React.FC<ArticleEditPageProps> = memo(
  function ArticleEditPage({ className }: ArticleEditPageProps) {
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()
    const isEdit = Boolean(id)

    return (
      <Page className={cn("article-edit-page", [className])}>
        {isEdit
          ? t("Редактирование статьи с ID = ") + id
          : t("Создание новой статьи")}
      </Page>
    )
  }
)

export default ArticleEditPage
