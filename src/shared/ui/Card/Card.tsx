import { HTMLAttributes, memo, ReactNode } from "react"
import { cn } from "shared/lib/classNames/classNames"

import "./Card.module.scss"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string

  children: ReactNode
}

export const Card = memo(function Card(props: CardProps) {
  const { className, children, ...otherProps } = props

  return (
    <div className={cn("card", [className])} {...otherProps}>
      {children}
    </div>
  )
})
