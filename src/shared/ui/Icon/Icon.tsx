import React, { memo } from "react"
import { cn } from "shared/lib/classNames/classNames"

import "./Icon.module.scss"

interface IconProps {
  className?: string
  Svg: React.FC<React.SVGProps<SVGSVGElement>>
}

export const Icon: React.FC<IconProps> = memo(function Icon(props: IconProps) {
  const { className, Svg } = props

  return <Svg className={cn("icon", [className])} />
})
