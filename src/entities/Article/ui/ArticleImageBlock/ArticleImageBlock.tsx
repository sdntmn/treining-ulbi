import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import {
  TextAlign,
  TextParagraf as TextParagrafDeprecated,
} from "@/shared/ui/deprecated/TextParagraf"
import { Text } from "@/shared/ui/redesigned/Text"

import { ArticleImage } from "../../model/types"

import "./ArticleImageBlock.module.scss"

interface ArticleImageBlockProps {
  className?: string
  block?: ArticleImage
}

export const ArticleImageBlock: React.FC<ArticleImageBlockProps> = memo(function ArticleImageBlock({
  className,
  block,
}: ArticleImageBlockProps) {
  return (
    <div className={cn("article-image-block", [className])}>
      <img src={block?.src} alt={block?.title} className="article-image-block__image" />
      {block?.title && (
        <ToggleFeaturesComponent
          feature="isAppRedesigned"
          on={<Text text={block.title} align={"center"} />}
          off={<TextParagrafDeprecated text={block.title} align={TextAlign.CENTER} />}
        />
      )}
    </div>
  )
})
