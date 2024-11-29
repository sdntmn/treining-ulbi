import React, { memo } from "react"
import { cn } from "shared/lib/classNames/classNames"

import "./Icon.module.scss"

interface IconProps {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const Icon = memo(function Icon(props: IconProps) {
  const { className, Svg } = props

  return <Svg className={cn("icon", [className])} />
})
