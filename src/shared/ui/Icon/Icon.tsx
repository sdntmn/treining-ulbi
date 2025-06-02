import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import "./Icon.module.scss"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  Svg: React.FC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean
}

export const Icon: React.FC<IconProps> = memo(function Icon(props: IconProps) {
  const { className, Svg, inverted, ...otherProps } = props

  return (
    <Svg className={cn("", [className, inverted ? "icon__inverted" : "icon"])} {...otherProps} />
  )
})
