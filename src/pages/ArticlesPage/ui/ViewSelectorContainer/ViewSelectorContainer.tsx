import { memo } from "react"

import { ArticleViewSelector } from "@/features/ArticleViewSelector"

import { useArticleFilters } from "../../lib/hooks/useArticleFilters"

interface Props {
  className?: string
}

export const ViewSelectorContainer = memo((props: Props) => {
  const { className } = props
  const { view, onChangeView } = useArticleFilters()

  return <ArticleViewSelector className={className} view={view} onViewClick={onChangeView} />
})

ViewSelectorContainer.displayName = "ViewSelectorContainer"
