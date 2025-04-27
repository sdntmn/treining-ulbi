import { getArticleDetailsData } from "entities/Article/model/selectors/articleDetails"
import { getCanEditArticle } from "pages/ArticlesDetailsPage/model/selectors/article"
// import { getUserAuthData } from "entities/User"
// import { getCanEditArticle } from "pages/ArticleDetailsPage/model/selectors/article"
import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RoutePath } from "shared/config/routerConfig/routerConfig"
import { cn } from "shared/lib/classNames/classNames"
import { Button, ButtonVar } from "shared/ui/Button/Button"

import "./ArticleDetailsPageHeader.module.scss"

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
      navigate(RoutePath.articles)
    }, [navigate])

    const onEditArticle = useCallback(() => {
      navigate(`${RoutePath.article_details}${article?.id}/edit`)
    }, [article?.id, navigate])

    return (
      <div className={cn("article-details-page-header", [className])}>
        <Button buttonVar={ButtonVar.OUTLINE} onClick={onBackToList}>
          {t("articleBtnBackToList")}
        </Button>

        {canEdit && (
          <Button
            className="article-details-page-header__btn-edit"
            buttonVar={ButtonVar.OUTLINE}
            onClick={onEditArticle}
          >
            {t("articleBtnEditing")}
          </Button>
        )}
      </div>
    )
  })
