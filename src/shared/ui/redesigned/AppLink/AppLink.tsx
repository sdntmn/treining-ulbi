import React, { memo, ReactNode } from "react"
import { LinkProps, NavLink } from "react-router-dom"

import { AppLinkColor } from "@/shared/const/type"
import { cn } from "@/shared/lib/classNames/classNames"

import "./AppLink.module.scss"

export interface AppLinkProps extends LinkProps {
  className?: string
  appLinkColor?: AppLinkColor
  children: ReactNode
  activeClassName?: string
}

export const AppLink: React.FC<AppLinkProps> = memo<AppLinkProps>(function AppLink(
  props: AppLinkProps
) {
  const {
    activeClassName = "",
    className = "",
    children,
    appLinkColor = "primary",
    to,
    ...otherProps
  } = props

  return (
    <NavLink
      className={({ isActive }) =>
        cn("app-link", [className, `app-link__${appLinkColor}`, isActive && activeClassName])
      }
      to={to}
      {...otherProps}
    >
      {children}
    </NavLink>
  )
})
