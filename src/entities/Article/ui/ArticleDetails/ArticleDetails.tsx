import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import CalendarIcon from "@/shared/assets/icons/clarity_date-line.svg"
import EyeIcon from "@/shared/assets/icons/eye-outlined.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect"
import { Avatar } from "@/shared/ui/deprecated/Avatar"
import { Icon } from "@/shared/ui/deprecated/Icon"
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton"
import {
  TextAlign,
  TextParagraf as TextDeprecated,
  TextSize,
} from "@/shared/ui/deprecated/TextParagraf"
import { AppImage } from "@/shared/ui/redesigned/AppImage"
import { Skeleton } from "@/shared/ui/redesigned/Skeleton"
import { HStack, VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails"
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById"
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice"

import "./ArticleDetails.module.scss"
import { renderArticleBlock } from "./renderBlock"

interface ArticleDetailsProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData)
  return (
    <>
      <HStack justify="center" max>
        <Avatar size={200} src={article?.img} />
      </HStack>
      <VStack gap="4" max data-testid="ArticleDetails.Info">
        <TextDeprecated title={article?.title} text={article?.subTitle} size={TextSize.L} />
        <HStack gap="8">
          <Icon Svg={EyeIcon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>
        <HStack gap="8">
          <Icon Svg={CalendarIcon} />
          <TextDeprecated />
        </HStack>
      </VStack>
      {article?.blocks.map(renderArticleBlock)}
    </>
  )
}

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData)

  return (
    <>
      <Text title={article?.title} size="l" bold />
      <Text title={article?.subTitle} />
      <AppImage
        className="article-details__image"
        fallback={<Skeleton width="100%" height={420} border="16px" />}
        src={article?.img}
      />
      {article?.blocks.map(renderArticleBlock)}
    </>
  )
}

export const ArticleDetails: React.FC<ArticleDetailsProps> = memo(function ArticleDetails({
  className,
  id,
}: ArticleDetailsProps) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const isLoading = useSelector(getArticleDetailsIsLoading)
  const error = useSelector(getArticleDetailsError)

  let content

  if (isLoading) {
    content = (
      <>
        <SkeletonDeprecated
          className="article-details__skeleton-avatar"
          width={200}
          height={200}
          border="50%"
        />
        <SkeletonDeprecated width={300} height={32} />
        <SkeletonDeprecated width={600} height={24} />
        <SkeletonDeprecated width="100%" height={200} />
        <SkeletonDeprecated width="100%" height={200} />
      </>
    )
  } else if (error) {
    content = (
      <TextDeprecated align={TextAlign.CENTER} title={t("Произошла ошибка при загрузке статьи.")} />
    )
  } else {
    content = (
      <ToggleFeaturesComponent feature="isAppRedesigned" on={<Redesigned />} off={<Deprecated />} />
    )
  }

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id))
    }
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack gap="16" className={cn("article-details", [className])}>
        {content}
      </VStack>
    </DynamicModuleLoader>
  )
})
