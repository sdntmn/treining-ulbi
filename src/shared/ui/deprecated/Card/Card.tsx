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
  max?: boolean
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Card: React.FC<CardProps> = memo(function Card(props: CardProps) {
  const { className, children, theme = CardTheme.NORMAL, max, ...otherProps } = props

  return (
    <div
      className={cn("card-deprecated", [
        className,
        theme && `card-deprecated__${theme}`,
        max && "card-deprecated__width-max",
      ])}
      {...otherProps}
    >
      {children}
    </div>
  )
})
