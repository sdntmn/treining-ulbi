import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { TextParagraf as TextParagrafDeprecated } from "@/shared/ui/deprecated/TextParagraf"
import { Text } from "@/shared/ui/redesigned/Text"

import { ArticleText } from "../../model/types"

import "./ArticleTextBlock.module.scss"

interface ArticleTextBlockProps {
  className?: string
  block: ArticleText
}

export const ArticleTextBlock: React.FC<ArticleTextBlockProps> = memo(function ArticleTextBlock({
  className,
  block,
}: ArticleTextBlockProps) {
  return (
    <div className={cn("article-text-block", [className])}>
      {block.title && (
        <ToggleFeaturesComponent
          feature="isAppRedesigned"
          on={<Text title={block.title} className="article-text-block__title" />}
          off={<TextParagrafDeprecated title={block.title} className="article-text-block__title" />}
        />
      )}
      {block.paragraphs.map((paragraph, index) => (
        <ToggleFeaturesComponent
          key={index}
          feature="isAppRedesigned"
          on={<Text key={index} text={paragraph} className="article-text-block__paragraf" />}
          off={
            <TextParagrafDeprecated
              key={index}
              text={paragraph}
              className="article-text-block__paragraf"
            />
          }
        />
      ))}
    </div>
  )
})
