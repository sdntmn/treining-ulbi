import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { Code } from "@/shared/ui/Code"

import type { ArticleCode } from "../../model/types"

interface ArticleCodeBlockProps {
  className?: string
  block: ArticleCode
}

export const ArticleCodeBlock: React.FC<ArticleCodeBlockProps> = memo(function ArticleCodeBlock({
  className,
  block,
}: ArticleCodeBlockProps) {
  return (
    <div className={cn("article-code-block", [className])}>
      <Code className="article-code-block__code" text={block.code} />
    </div>
  )
})
