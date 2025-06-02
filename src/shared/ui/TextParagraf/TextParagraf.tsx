import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import "./TextParagraf.module.scss"

export enum TextVar {
  PRIMARY = "primary",
  INVERTED = "inverted",
  ERROR = "error",
}

export enum TextAlign {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export enum TextSize {
  S = "size_s",
  M = "size_m",
  L = "size_l",
}

interface TextParagrafProps {
  className?: string
  title?: string
  text?: string
  textVar?: TextVar
  align?: TextAlign
  size?: TextSize

  "data-testid"?: string
}

type HeaderTagType = "h1" | "h2" | "h3"

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: "h3",
  [TextSize.M]: "h2",
  [TextSize.L]: "h1",
}

export const TextParagraf: React.FC<TextParagrafProps> = memo(function TextParagraf(
  props: TextParagrafProps
) {
  const {
    className,
    title,
    text,
    align = TextAlign.LEFT,
    textVar = TextVar.PRIMARY,
    size = TextSize.M,
    "data-testid": dataTestId = "TextParagraf",
  } = props

  const HeaderTag = mapSizeToHeaderTag[size]

  return (
    <div
      className={cn("paragraf", [
        className,
        textVar && `paragraf__${textVar}`,
        align && `paragraf__${align}`,
        size && `paragraf__${size}`,
      ])}
    >
      {title && (
        <HeaderTag className="paragraf__title" data-testid={`${dataTestId}.title`}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p className="paragraf__text" data-testid={`${dataTestId}.text`}>
          {text}
        </p>
      )}
    </div>
  )
})
