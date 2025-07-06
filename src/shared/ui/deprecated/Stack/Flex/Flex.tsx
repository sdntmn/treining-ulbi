import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import "./Flex.module.scss"

export type FlexJustify = "start" | "center" | "end" | "between"
export type FlexAlign = "start" | "center" | "end"
export type FlexDirection = "row" | "column"
export type FlexGap = "4" | "8" | "16" | "32"

const justifyClasses: Record<FlexJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
}

const alignClasses: Record<FlexAlign, string> = {
  start: "align-start",
  center: "align-center",
  end: "align-end",
}

const directionClasses: Record<FlexDirection, string> = {
  row: "direction-row",
  column: "direction-column",
}

const gapClasses: Record<FlexGap, string> = {
  4: "gap-4",
  8: "gap-8",
  16: "gap-16",
  32: "gap-32",
}

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface FlexProps extends DivProps {
  className?: string
  children: ReactNode
  justify?: FlexJustify
  align?: FlexAlign
  direction: FlexDirection
  gap?: FlexGap
  max?: boolean
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Flex: React.FC<FlexProps> = (props: FlexProps) => {
  const {
    className,
    children,
    justify = "start",
    align = "center",
    direction = "row",
    gap,
    max = false,
    ...otherProps
  } = props

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
    max ? "max" : "",
  ]

  return (
    <div className={cn("flex", classes)} {...otherProps}>
      {children}
    </div>
  )
}
