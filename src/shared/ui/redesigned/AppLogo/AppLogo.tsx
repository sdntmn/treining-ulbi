import { memo } from "react"

import AppSvg from "@/shared/assets/icons/app-image.svg"
import { cn } from "@/shared/lib/classNames/classNames"

import "./AppLogo.module.scss"

import { HStack } from "../Stack"
interface AppLogoProps {
  className?: string
  size?: number
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {
  return (
    <HStack max justify="center" className={cn("app-logo", [className])}>
      <AppSvg width={size} height={size} color="#58c3db" className="app-logo__image" />
      <div className="app-logo__gradient-big" />
      <div className="app-logo__gradient-small" />
    </HStack>
  )
})

AppLogo.displayName = "AppLogo"
