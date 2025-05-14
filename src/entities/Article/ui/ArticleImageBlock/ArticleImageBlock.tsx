import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { TextAlign, TextParagraf } from "@/shared/ui/TextParagraf"

import { ArticleImage } from "../../model/types"

import "./ArticleImageBlock.module.scss"

interface ArticleImageBlockProps {
  className?: string
  block?: ArticleImage
}

export const ArticleImageBlock: React.FC<ArticleImageBlockProps> = memo(
  function ArticleImageBlock({ className, block }: ArticleImageBlockProps) {
    return (
      <div className={cn("article-image-block", [className])}>
        <img
          src={block?.src}
          alt={block?.title}
          className="article-image-block__image"
        />
        {block?.title && (
          <TextParagraf text={block.title} align={TextAlign.CENTER} />
        )}
      </div>
    )
  }
)
