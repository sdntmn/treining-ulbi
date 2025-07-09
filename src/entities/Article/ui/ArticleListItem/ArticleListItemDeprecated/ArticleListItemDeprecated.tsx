import React, { memo } from "react"
import { useTranslation } from "react-i18next"

import EyeIcon from "@/shared/assets/icons/eye-outlined.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { routePatch } from "@/shared/lib/helpers/getPath"
import { useHover } from "@/shared/lib/hooks/useHover/useHover"
import { AppLink } from "@/shared/ui/deprecated/AppLink"
import { Avatar } from "@/shared/ui/deprecated/Avatar"
import { Button, ButtonVar } from "@/shared/ui/deprecated/Button"
import { Card } from "@/shared/ui/deprecated/Card"
import { Icon } from "@/shared/ui/deprecated/Icon"
import { Skeleton } from "@/shared/ui/deprecated/Skeleton"
import { TextParagraf } from "@/shared/ui/deprecated/TextParagraf"
import { AppImage } from "@/shared/ui/redesigned/AppImage"

import { ArticleBlockType, ArticleViewType } from "../../../model/consts"
import { ArticleBlock } from "../../../model/types"
import { ArticleTextBlock } from "../../ArticleTextBlock/ArticleTextBlock"
import { ArticleListItemProps } from "../type"

import "./ArticleListItem.module.scss"

export const ArticleListItemDeprecated: React.FC<ArticleListItemProps> = memo(function ArticleItem(
  props: ArticleListItemProps
) {
  const { className, article, view, target } = props

  const { t } = useTranslation("article")

  const [_, bindHover] = useHover()

  const types = (
    <TextParagraf text={article?.type.join(", ")} className="article-list-item__types" />
  )

  const views = (
    <>
      <TextParagraf text={String(article?.views)} className="article-list-item__views" />

      <Icon Svg={EyeIcon} />
    </>
  )

  if (view === ArticleViewType.LIST) {
    const textBlock = article.blocks?.find(
      (block: ArticleBlock) => block.type === ArticleBlockType.TEXT
    )

    return (
      <div
        data-testid={"ArticleListItem"}
        {...bindHover}
        className={cn("article-list-item-list", [className])}
      >
        <Card className="article-list-item-list">
          <div className="article-list-item-list__header">
            <Avatar size={30} src={article.user.avatar} />

            <TextParagraf
              text={article.user.username}
              className="article-list-item-list__username"
            />

            <TextParagraf text={article.createdAt} className="article-list-item-list__date" />
          </div>

          <TextParagraf title={article.title} className="article-list-item-list__title" />

          {types}

          <AppImage
            src={article?.img}
            className="article-list-item-list__img"
            alt={article?.title}
            fallback={<Skeleton width={"100%"} height={"250"} />}
          />

          {textBlock && (
            <ArticleTextBlock block={textBlock} className="article-list-item-list__text-block" />
          )}

          <div className="article-list-item-list__footer">
            <AppLink target={target} to={routePatch.articleDetails(article.id)}>
              <Button buttonVar={ButtonVar.OUTLINE}>{t("articleBtnReadMore")}</Button>
            </AppLink>

            {views}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <AppLink
      data-testid={"ArticleListItem"}
      target={target}
      className={cn("article-list-item-card", [className])}
      to={routePatch.articleDetails(article.id)}
    >
      <Card className="article-list-item-card">
        <div className="article-list-item-card__image-wrapper">
          <AppImage
            src={article?.img}
            className="article-list-item-card__img"
            alt={article?.title}
            fallback={<Skeleton width={"200"} height={"200"} border="50%" />}
          />

          <TextParagraf text={article?.createdAt} className="article-list-item-card__date" />
        </div>

        <div className="article-list-item-card__info-wrapper">
          {types}

          {views}
        </div>

        <TextParagraf text={article?.title} className="article-list-item-card__title" />
      </Card>
    </AppLink>
  )
})
