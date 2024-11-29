import { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import EyeIcon from "shared/assets/icons/eye-outlined.svg"
import { RoutePath } from "shared/config/routerConfig/routerConfig"
import { cn } from "shared/lib/classNames/classNames"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Button, ButtonVar } from "shared/ui/Button/Button"
import { Card } from "shared/ui/Card/Card"
import { Icon } from "shared/ui/Icon/Icon"
import { TextParagraf } from "shared/ui/TextParagraf/TextParagraf"

import {
  Article,
  ArticleBlockType,
  ArticleText,
  ArticleViewType,
} from "../../model/types/article"
import { ArticleTextBlock } from "../ArticleTextBlock/ArticleTextBlock"

import "./ArticleListItem.module.scss"

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleViewType
}

export const ArticleListItem = memo(function ArticleListItem(
  props: ArticleListItemProps
) {
  const { className, article, view } = props
  const navigate = useNavigate()

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.article_details + article.id)
  }, [article.id, navigate])

  const types = (
    <TextParagraf
      text={article.type.join(", ")}
      className="article-list-item__types"
    />
  )
  const views = (
    <>
      <TextParagraf
        text={String(article.views)}
        className="article-list-item__views"
      />
      <Icon Svg={EyeIcon} />
    </>
  )

  if (view === ArticleViewType.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleText
    return (
      <div className={cn("article-list-item", [className])}>
        <Card className="article-list-item__card">
          <div className="article-list-item__header">
            <Avatar size={30} src={article.user.avatar} />
            <TextParagraf
              text={article.user.username}
              className="article-list-item__username"
            />
            <TextParagraf
              text={article.createdAt}
              className="article-list-item__date"
            />
          </div>
          <TextParagraf
            title={article.title}
            className="article-list-item__title"
          />
          {types}
          <img
            src={article.img}
            className="article-list-item__img"
            alt={article.title}
          />
          {textBlock && (
            <ArticleTextBlock
              block={textBlock}
              className="article-list-item__text-block"
            />
          )}
          <div className="article-list-item__footer">
            <Button onClick={onOpenArticle} buttonVar={ButtonVar.OUTLINE}>
              Читать далее...
            </Button>
            {views}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("article-list-item", [className])}>
      <Card className="article-list-item__card " onClick={onOpenArticle}>
        <div className="article-list-item__image-wrapper">
          <img
            src={article.img}
            className="article-list-item__img"
            alt={article.title}
          />
          <TextParagraf
            text={article.createdAt}
            className="article-list-item__date"
          />
        </div>
        <div className="article-list-item__info-wrapper">
          {types}
          {views}
        </div>
        <TextParagraf
          text={article.title}
          className="article-list-item__title"
        />
      </Card>
    </div>
  )
})
