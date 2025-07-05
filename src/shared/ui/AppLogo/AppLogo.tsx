import { memo } from "react"

import AppSvg from "@/shared/assets/icons/app-image.svg"
import { cn } from "@/shared/lib/classNames/classNames"

import { HStack } from "../Stack"

import "./AppLogo.module.scss"

interface AppLogoProps {
  className?: string
}

export const AppLogo = memo(({ className }: AppLogoProps) => {
  return (
    <HStack max justify="center" className={cn("app-logo", [className])}>
      <div className="app-logo__gradient-big" />
      <div className="app-logo__gradient-small" />
      <AppSvg className="app-logo__image" />
    </HStack>
  )
})

AppLogo.displayName = "AppLogo"
