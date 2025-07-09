import { memo } from "react"
import { useTranslation } from "react-i18next"

import EyeIcon from "@/shared/assets/icons/eye.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { routePatch } from "@/shared/lib/helpers/getPath"
import { AppImage } from "@/shared/ui/redesigned/AppImage"
import { AppLink } from "@/shared/ui/redesigned/AppLink"
import { Avatar } from "@/shared/ui/redesigned/Avatar"
import { Button } from "@/shared/ui/redesigned/Button"
import { Card } from "@/shared/ui/redesigned/Card"
import { Icon } from "@/shared/ui/redesigned/Icon"
import { Skeleton } from "@/shared/ui/redesigned/Skeleton"
import { HStack, VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

import { ArticleBlockType, ArticleViewType } from "../../../model/consts"
import { ArticleBlock } from "../../../model/types"
import { ArticleListItemProps } from "../type"

import "./ArticleListItemRedesigned.module.scss"

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props

  const { t } = useTranslation()

  const types = <Text text={article.type.join(", ")} className={"articles-item__types"} />

  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />

      <Text text={String(article.views)} className={"articles-item__views"} />
    </HStack>
  )

  if (view === ArticleViewType.LIST) {
    const textBlock = article.blocks?.find(
      (block: ArticleBlock) => block.type === ArticleBlockType.TEXT
    )

    return (
      <Card
        padding="24"
        max
        data-testid="ArticleListItem"
        className={cn("article-list-item", [className])}
      >
        <VStack max gap="16">
          <HStack gap="8" max>
            <Avatar size={32} src={article.user.avatar} />

            <Text bold text={article.user.username} />

            <Text text={article.createdAt} />
          </HStack>

          <Text title={article.title} bold />

          <Text title={article.subTitle} size="s" />

          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.img}
            className={"article-list-item__image"}
            alt={article.title}
          />

          {textBlock?.paragraphs && (
            <Text
              className={"article-list-item__text-block"}
              text={textBlock.paragraphs.slice(0, 2).join(" ")}
            />
          )}

          <HStack max justify="between">
            <AppLink target={target} to={routePatch.articleDetails(article.id)}>
              <Button variant="outline">{t("Читать далее...")}</Button>
            </AppLink>

            {views}
          </HStack>
        </VStack>
      </Card>
    )
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={routePatch.articleDetails(article.id)}
      className={cn("article-card-item", [className])}
    >
      <Card className={"article-card-item__card"}>
        <div className={"article-card-item__image-wrapper"}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            alt={article.title}
            src={article.img}
            className={"article-card-item__img"}
          />

          <Text text={article.createdAt} className={"article-card-item__date"} />
        </div>

        <div className={"article-card-item__info-wrap"}>
          {types}

          {views}
        </div>

        <Text text={article.title} className={"article-card-item__title"} />
      </Card>
    </AppLink>
  )
})

ArticleListItemRedesigned.displayName = "ArticleListItemRedesigned"
