import type { Article, ArticleBlock } from "../../model/types"

import React, { HTMLAttributeAnchorTarget, memo } from "react"
import { useTranslation } from "react-i18next"

import EyeIcon from "@/shared/assets/icons/eye-outlined.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { routePatch } from "@/shared/lib/helpers/getPath"
import { useHover } from "@/shared/lib/hooks/useHover/useHover"
import { AppImage } from "@/shared/ui/AppImage"
import { AppLink } from "@/shared/ui/AppLink"
import { Avatar } from "@/shared/ui/Avatar"
import { Button, ButtonVar } from "@/shared/ui/Button"
import { Card } from "@/shared/ui/Card"
import { Icon } from "@/shared/ui/Icon"
import { Skeleton } from "@/shared/ui/Skeleton"
import { TextParagraf } from "@/shared/ui/TextParagraf"

import { ArticleBlockType, ArticleViewType } from "../../model/consts"
import { ArticleTextBlock } from "../ArticleTextBlock/ArticleTextBlock"

import "./ArticleListItem.module.scss"

interface ArticleItemProps {
  className?: string
  article: Article
  view: ArticleViewType
  target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem: React.FC<ArticleItemProps> = memo(
  function ArticleItem(props: ArticleItemProps) {
    const { className, article, view, target } = props
    const { t } = useTranslation("article")
    const [isHover, bindHover] = useHover()
    console.info(isHover)

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
            <AppImage
              src={article?.img}
              className="article-item__img"
              alt={article?.title}
              fallback={<Skeleton width={"100%"} height={"250"} />}
            />
            {textBlock && (
              <ArticleTextBlock
                block={textBlock}
                className="article-item__text-block"
              />
            )}
            <div className="article-item__footer">
              <AppLink
                target={target}
                to={routePatch.articleDetails(article.id)}
              >
                <Button buttonVar={ButtonVar.OUTLINE}>
                  {t("articleBtnReadMore")}
                </Button>
              </AppLink>
              {views}
            </div>
          </Card>
        </div>
      )
    }

    return (
      <AppLink
        target={target}
        className={cn("article-item__card", [className])}
        to={routePatch.articleDetails(article.id)}
      >
        <Card className="article-item__card-item ">
          <div className="article-item__image-wrapper">
            <AppImage
              src={article?.img}
              className="article-item__img"
              alt={article?.title}
              fallback={<Skeleton width={"200"} height={"200"} border="50%" />}
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
      </AppLink>
    )
  }
)
