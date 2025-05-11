import type { ArticleBlock } from "../../model/types"

import React, { memo, useCallback } from "react"
import { useSelector } from "react-redux"

import CalendarIcon from "@/shared/assets/icons/clarity_date-line.svg"
import EyeIcon from "@/shared/assets/icons/eye-outlined.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect"
import { Avatar } from "@/shared/ui/Avatar/Avatar"
import { Icon } from "@/shared/ui/Icon/Icon"
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton"
import { HStack, VStack } from "@/shared/ui/Stack"
import { TextParagraf, TextSize } from "@/shared/ui/TextParagraf/TextParagraf"

import { ArticleBlockType } from "../../model/consts/consts"
import {
  getArticleDetailsData,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails"
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById"
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice"
import { ArticleCodeBlock } from "../ArticleCodeBlock/ArticleCodeBlock"
import { ArticleImageBlock } from "../ArticleImageBlock/ArticleImageBlock"
import { ArticleTextBlock } from "../ArticleTextBlock/ArticleTextBlock"

import "./ArticleDetails.module.scss"

interface ArticleDetailsProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetails: React.FC<ArticleDetailsProps> = memo(
  function ArticleDetails({ className, id }: ArticleDetailsProps) {
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const article = useSelector(getArticleDetailsData)

    const renderBlock = useCallback((block: ArticleBlock) => {
      switch (block.type) {
        case ArticleBlockType.CODE:
          return (
            <ArticleCodeBlock
              key={block.id}
              className="article-details__block"
              block={block}
            />
          )
        case ArticleBlockType.IMAGE:
          return (
            <ArticleImageBlock
              key={block.id}
              className="article-details__block"
              block={block}
            />
          )
        case ArticleBlockType.TEXT:
          return (
            <ArticleTextBlock
              key={block.id}
              className="article-details__block"
              block={block}
            />
          )
        default:
          return null
      }
    }, [])

    const renderSkeleton = () => (
      <VStack gap="16" max>
        <Skeleton
          className="article-details__skeleton-avatar"
          width={200}
          height={200}
          border="50%"
        />
        <Skeleton width={300} height={32} />
        <Skeleton width={600} height={24} />
        <Skeleton width="100%" height={200} />
        <Skeleton width="100%" height={200} />
      </VStack>
    )

    const renderContent = () => (
      <>
        <HStack justify="center" max>
          <Avatar size={200} src={article?.img} />
        </HStack>

        <VStack gap="4" max>
          <TextParagraf
            title={article?.title}
            text={article?.subTitle}
            size={TextSize.L}
          />
          <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <TextParagraf text={String(article?.views)} />
          </HStack>
          <HStack gap="8">
            <Icon Svg={CalendarIcon} />
            <TextParagraf text={article?.createdAt} />
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    )

    useInitialEffect(() => {
      if (id) {
        dispatch(fetchArticleById(id))
      }
    })

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <VStack gap="16" className={cn("article-details", [className])}>
          {isLoading ? renderSkeleton() : renderContent()}
        </VStack>
      </DynamicModuleLoader>
    )
  }
)
