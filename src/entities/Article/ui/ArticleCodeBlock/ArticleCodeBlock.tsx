import { memo } from "react"
import { cn } from "shared/lib/classNames/classNames"
import { Code } from "shared/ui/Code/Code"

import { ArticleCode } from "../../model/types/article"

import "./ArticleCodeBlock.module.scss"

interface ArticleCodeBlockProps {
  className?: string
  block: ArticleCode
}

export const ArticleCodeBlock = memo(function ArticleCodeBlock({
  className,
  block,
}: ArticleCodeBlockProps) {
  return (
    <div className={cn("article-code-block", [className])}>
      <Code className="article-code-block__code" text={block.code} />
    </div>
  )
})
