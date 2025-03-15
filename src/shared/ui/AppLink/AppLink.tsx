import React, { memo } from "react"
import { Link, LinkProps } from "react-router-dom"
import { cn } from "shared/lib/classNames/classNames"

import "./AppLink.module.scss"

export enum AppLinkColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface AppLinkProps extends LinkProps {
  className?: string
  appLinkColor?: AppLinkColor
  children: React.ReactNode
}

export const AppLink: React.FC<AppLinkProps> = memo<AppLinkProps>(
  function AppLink(props: AppLinkProps) {
    const {
      className = "",
      children,
      appLinkColor = AppLinkColor.PRIMARY,
      to,
      ...otherProps
    } = props

    return (
      <Link
        className={cn("app-link", [className, `app-link__${appLinkColor}`])}
        to={to}
        {...otherProps}
      >
        {children}
      </Link>
    )
  }
)
