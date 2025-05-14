import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { TextParagraf } from "@/shared/ui/TextParagraf"

import { ArticleText } from "../../model/types"

import "./ArticleTextBlock.module.scss"

interface ArticleTextBlockProps {
  className?: string
  block: ArticleText
}

export const ArticleTextBlock: React.FC<ArticleTextBlockProps> = memo(
  function ArticleTextBlock({ className, block }: ArticleTextBlockProps) {
    return (
      <div className={cn("article-text-block", [className])}>
        {block.title && (
          <TextParagraf
            title={block.title}
            className="article-text-block__title"
          />
        )}
        {block.paragraphs.map((paragraf, index) => (
          <TextParagraf
            key={index}
            text={paragraf}
            className="article-text-block__paragraf"
          />
        ))}
      </div>
    )
  }
)
