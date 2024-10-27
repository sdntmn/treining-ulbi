import React, { memo } from "react"
import { cn } from "shared/lib/classNames/classNames"

import "./TextParagraf.module.scss"

export enum TextVar {
  PRIMARY = "primary",
  ERROR = "error",
}

export enum TextAlign {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export enum TextSize {
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
}

export const TextParagraf: React.FC<TextParagrafProps> = memo(
  function TextParagraf(props: TextParagrafProps) {
    const {
      className,
      title,
      text,
      align = TextAlign.LEFT,
      textVar = TextVar.PRIMARY,
      size = TextSize.M,
    } = props

    console.log(textVar)

    return (
      <div
        className={cn("paragraf", [
          className,
          textVar && `paragraf__${textVar}`,
          align && `paragraf__${align}`,
          size && `paragraf__${size}`,
        ])}
      >
        {title && <p className="paragraf__title">{title}</p>}
        {text && <p className="paragraf__text">{text}</p>}
      </div>
    )
  }
)
