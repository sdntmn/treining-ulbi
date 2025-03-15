import React, { memo, useCallback } from "react"
import { useSelector } from "react-redux"
import CalendarIcon from "shared/assets/icons/clarity_date-line.svg"
import EyeIcon from "shared/assets/icons/eye-outlined.svg"
import { cn } from "shared/lib/classNames/classNames"
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Icon } from "shared/ui/Icon/Icon"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { TextParagraf, TextSize } from "shared/ui/TextParagraf/TextParagraf"

import {
  getArticleDetailsData,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails"
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById"
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice"
import { ArticleBlock, ArticleBlockType } from "../../model/types/article"
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

    let content

    if (isLoading) {
      content = (
        <>
          <Skeleton
            className="article-details__skeleton-avatar"
            width={200}
            height={200}
            border="50%"
          />
          <Skeleton
            className="article-details__skeleton-title"
            width={300}
            height={32}
          />
          <Skeleton
            className="article-details__skeleton"
            width={600}
            height={24}
          />
          <Skeleton
            className="article-details__skeleton"
            width="100%"
            height={200}
          />
          <Skeleton
            className="article-details__skeleton"
            width="100%"
            height={200}
          />
        </>
      )
    } else {
      content = (
        <>
          <div className="article-details__avatar-wrapper">
            <Avatar
              size={200}
              src={article?.img}
              className="article-details__avatar"
            />
          </div>
          <TextParagraf
            className="article-details__paragraf"
            title={article?.title}
            text={article?.subTitle}
            size={TextSize.L}
          />
          <div className="article-details__info">
            <Icon className="article-details__icon" Svg={EyeIcon} />
            <TextParagraf text={String(article?.views)} />
          </div>
          <div className="article-details__info">
            <Icon className="article-details__icon" Svg={CalendarIcon} />
            <TextParagraf text={article?.createdAt} />
          </div>
          {article?.blocks.map(renderBlock)}
        </>
      )
    }

    useInitialEffect(() => dispatch(fetchArticleById(id)))
    console.info(content)

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
        <div className={cn("article-details", [className])}>{content}</div>
      </DynamicModuleLoader>
    )
  }
)
