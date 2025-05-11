import React, { HTMLAttributes, memo, ReactNode } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import "./Card.module.scss"

export enum CardTheme {
  NORMAL = "normal",
  OUTLINED = "outlined",
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  theme?: CardTheme
}

export const Card: React.FC<CardProps> = memo(function Card(props: CardProps) {
  const { className, children, theme = CardTheme.NORMAL, ...otherProps } = props

  return (
    <div
      className={cn("card", [className, theme && `card__${theme}`])}
      {...otherProps}
    >
      {children}
    </div>
  )
})
