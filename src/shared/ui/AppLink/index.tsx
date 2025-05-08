import React, { memo, ReactNode } from "react"
import { Link, LinkProps } from "react-router-dom"
import { cn } from "shared/lib/classNames/classNames"

import { AppLinkColor } from "../../const/enums"

import "./AppLink.module.scss"

export interface AppLinkProps extends LinkProps {
  className?: string
  appLinkColor?: AppLinkColor
  children: ReactNode
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
