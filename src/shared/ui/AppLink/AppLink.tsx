import { Link, type LinkProps } from "react-router-dom"
import { cn } from "shared/lib/helpers/classNames/classNames"

import "./AppLink.module.scss"

export enum AppLinkColor {
  Primary = "primary",
  Secondary = "secondary",
}

interface AppLinkProps extends LinkProps {
  className?: string
  children: React.ReactNode
  appLinkColor?: AppLinkColor
}

export const AppLink: React.FC<AppLinkProps> = ({
  className,
  children,
  appLinkColor = AppLinkColor.Primary,
  to,
  ...otherProps
}) => {
  return (
    <Link
      className={cn("app-link", {}, [className, `app-link__${appLinkColor}`])}
      to={to}
      {...otherProps}
    >
      {children}
    </Link>
  )
}
