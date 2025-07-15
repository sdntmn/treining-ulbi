import React, { memo, ReactNode } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { TextAlign, TextSize, TextVariant } from "@/shared/types/type"
import "./Text.module.scss"

interface TextProps {
  className?: string
  children?: ReactNode
  title?: string
  text?: string
  variant?: TextVariant
  align?: TextAlign
  size?: TextSize
  bold?: boolean

  "data-testid"?: string
}

type HeaderTagType = "h1" | "h2" | "h3"

const mapSizeToClass: Record<TextSize, string> = {
  s: "s",
  m: "m",
  l: "l",
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: "h3",
  m: "h2",
  l: "h1",
}

export const Text: React.FC<TextProps> = memo(function TextParagraf(props: TextProps) {
  const {
    className,
    title,
    text,
    align = "left",
    variant = "primary",
    size = "m",
    bold,
    children,
    "data-testid": dataTestId = "TextParagraf",
  } = props

  const HeaderTag = mapSizeToHeaderTag[size]

  const sizeClass = mapSizeToClass[size]

  return (
    <div
      className={cn("text", [
        className,
        variant && `text__${variant}`,
        align && `text__${align}`,
        size && `text__size_${sizeClass}`,
        bold && "text__bold",
      ])}
    >
      {title && (
        <HeaderTag className="text__title" data-testid={`${dataTestId}.title`}>
          {title}
        </HeaderTag>
      )}
      {text ||
        (children && (
          <p className="text__paragraf" data-testid={`${dataTestId}.text`}>
            {text || children}
          </p>
        ))}
    </div>
  )
})
