import React, { memo, ReactNode } from "react"
import { Link, LinkProps } from "react-router-dom"

import { cn } from "@/shared/lib/classNames/classNames"
import { AppLinkColor } from "@/shared/types/type"

import "./AppLink.module.scss"

export interface AppLinkProps extends LinkProps {
  className?: string
  appLinkColor?: AppLinkColor
  children: ReactNode
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const AppLink: React.FC<AppLinkProps> = memo<AppLinkProps>(function AppLink(
  props: AppLinkProps
) {
  const { className = "", children, appLinkColor = "primary", to, ...otherProps } = props

  return (
    <Link
      className={cn("app-link", [className, `app-link__${appLinkColor}`])}
      to={to}
      {...otherProps}
    >
      {children}
    </Link>
  )
})
