import { memo } from "react"
import { useTranslation } from "react-i18next"

import EyeIcon from "@/shared/assets/icons/eye.svg"
import { getRouteArticleDetails } from "@/shared/const/routes"
import { cn } from "@/shared/lib/classNames/classNames"
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

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} />
      <Text bold text={article.user?.username} />
    </>
  )

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
            {userInfo}

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
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
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
      to={getRouteArticleDetails(article.id)}
      className={cn("article-card-item", [className])}
    >
      <Card className={"article-card-item__card"} padding="0">
        <AppImage
          fallback={<Skeleton width={240} height={140} />}
          alt={article.title}
          src={article.img}
          className={"article-card-item__img"}
        />
        <VStack className="article-card-item__info" gap="4">
          <Text text={article.title} className={"article-card-item__title"} />

          <VStack gap="4" className={"article-card-item__footer"} max>
            <HStack justify="between" max>
              <Text text={article.createdAt} className={"article-card-item__date"} />
              {views}
            </HStack>
            <HStack gap="4">{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  )
})

ArticleListItemRedesigned.displayName = "ArticleListItemRedesigned"
