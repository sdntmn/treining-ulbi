import { ReactElement } from "react"

import { AppRoutes } from "@/shared/const/routes"
import { useRouteChange } from "@/shared/lib/router/useRouteChange"

import { ScrollToolbar } from "@/widgets/ScrollToolbar"

export function useAppToolbar() {
  const appRoute = useRouteChange()

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
  }

  if (!appRoute || !(appRoute in toolbarByAppRoute)) {
    return undefined
  }

  return toolbarByAppRoute[appRoute]
}
