import React, { HTMLAttributes, memo, ReactNode } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { CardPadding, CardVariant } from "@/shared/types/type"
import "./Card.module.scss"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  variant?: CardVariant
  max?: boolean
  padding?: CardPadding
}

const mapPaddingToClass: Record<CardPadding, string> = {
  "0": "padding-0",
  "8": "padding-8",
  "16": "padding-16",
  "24": "padding-24",
}

export const Card: React.FC<CardProps> = memo(function Card(props: CardProps) {
  const { className, children, padding = "8", variant = "normal", max, ...otherProps } = props

  const paddingClass = mapPaddingToClass?.[padding]

  return (
    <div
      className={cn("card", [
        className,
        variant && `card__${variant}`,
        max && "card__width-max",
        `card__${paddingClass}`,
      ])}
      {...otherProps}
    >
      {children}
    </div>
  )
})
