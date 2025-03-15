import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import EyeIcon from "shared/assets/icons/eye-outlined.svg"
import { RoutePath } from "shared/config/routerConfig/routerConfig"
import { cn } from "shared/lib/classNames/classNames"
import { useHover } from "shared/lib/hooks/useHover/useHover"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Button, ButtonVar } from "shared/ui/Button/Button"
import { Card } from "shared/ui/Card/Card"
import { Icon } from "shared/ui/Icon/Icon"
import { TextParagraf } from "shared/ui/TextParagraf/TextParagraf"

import {
  Article,
  ArticleBlock,
  ArticleBlockType,
  ArticleViewType,
} from "../../model/types/article"
import { ArticleTextBlock } from "../ArticleTextBlock/ArticleTextBlock"

import "./ArticleListItem.module.scss"

interface ArticleItemProps {
  className?: string
  article: Article
  view: ArticleViewType
}

export const ArticleItem: React.FC<ArticleItemProps> = memo(
  function ArticleItem(props: ArticleItemProps) {
    const { className, article, view } = props
    const { t } = useTranslation("article")
    const [isHover, bindHover] = useHover()
    console.info(isHover)
    const navigate = useNavigate()

    const onOpenArticle = useCallback(() => {
      navigate(RoutePath.article_details + article.id)
    }, [article?.id, navigate])

    const types = (
      <TextParagraf
        text={article?.type.join(", ")}
        className="article-list-item__types"
      />
    )
    const views = (
      <>
        <TextParagraf
          text={String(article?.views)}
          className="article-item__views"
        />
        <Icon Svg={EyeIcon} />
      </>
    )

    if (view === ArticleViewType.LIST) {
      const textBlock = article.blocks?.find(
        (block: ArticleBlock) => block.type === ArticleBlockType.TEXT
      )
      return (
        <div {...bindHover} className={cn("article-item__list", [className])}>
          <Card className="article-item__card-list">
            <div className="article-item__header">
              <Avatar size={30} src={article.user.avatar} />
              <TextParagraf
                text={article.user.username}
                className="article-item__username"
              />
              <TextParagraf
                text={article.createdAt}
                className="article-item__date"
              />
            </div>
            <TextParagraf
              title={article.title}
              className="article-item__title"
            />
            {types}
            <img
              src={article?.img}
              className="article-item__img"
              alt={article?.title}
            />
            {textBlock && (
              <ArticleTextBlock
                block={textBlock}
                className="article-item__text-block"
              />
            )}
            <div className="article-item__footer">
              <Button onClick={onOpenArticle} buttonVar={ButtonVar.OUTLINE}>
                {t("readMore")}
              </Button>
              {views}
            </div>
          </Card>
        </div>
      )
    }

    return (
      <div className={cn("article-item__card", [className])}>
        <Card className="article-item__card-item " onClick={onOpenArticle}>
          <div className="article-item__image-wrapper">
            <img
              src={article?.img}
              className="article-item__img"
              alt={article?.title}
            />
            <TextParagraf
              text={article?.createdAt}
              className="article-item__date"
            />
          </div>
          <div className="article-item__info-wrapper">
            {types}
            {views}
          </div>
          <TextParagraf text={article?.title} className="article-item__title" />
        </Card>
      </div>
    )
  }
)
