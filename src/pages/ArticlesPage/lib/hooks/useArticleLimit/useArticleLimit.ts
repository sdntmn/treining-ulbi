import { useWindowSize } from "@/shared/lib/hooks/useWindowsSize/useWindowsSize"

import { ArticleViewType } from "@/entities/Article"

export function useArticlesLimit(view: ArticleViewType) {
  const { windowWidth } = useWindowSize()

  if (view === ArticleViewType.LIST) {
    return 4
  }

  // Для карточек - динамический расчет
  const cardWidth = 230 // Минимальная ширина карточки
  const gap = 16 // Отступ между карточками
  const sidebarWidth = 300 // Отступ между карточками
  const cardsPerRow = Math.max(
    1,
    Math.floor((windowWidth - sidebarWidth + gap) / (cardWidth + gap))
  )

  // Возвращаем количество карточек на 2 ряда
  return cardsPerRow * 3
}
