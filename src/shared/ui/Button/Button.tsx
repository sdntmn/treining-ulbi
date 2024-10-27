import React, { ButtonHTMLAttributes } from "react"

import { cn } from "../../lib/classNames/classNames"

import "./Button.module.scss"

export enum ButtonVar {
  CLEAR = "clear",
  OUTLINE = "outline",
  PRIMARY = "praymary",
}

export enum ButtonSize {
  M = "size-m",
  L = "size-l",
  XL = "size-xl",
}

export enum ButtonFontSize {
  FONT_M = "font-m",
  FONT_L = "font-l",
  FONT_XL = "font-xl",
}

export enum ButtonSquare {
  SQUARE_M = "square-m",
  SQUARE_L = "square-l",
  SQUARE_XL = "square-xl",
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  buttonVar?: ButtonVar
  square?: ButtonSquare
  children?: React.ReactNode
  fontSize?: ButtonFontSize
  size?: ButtonSize
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    buttonVar,
    square = ButtonSquare.SQUARE_M,
    size,
    fontSize = ButtonFontSize.FONT_M,
    disabled,
    ...otherProps
  } = props

  return (
    <button
      type="button"
      className={cn("button", [
        className,
        buttonVar && `button__${buttonVar}`,
        square && `button__${square}`,
        fontSize && `button__${fontSize}`,
        size && `button__${size}`,
        disabled && "button__disabled",
      ])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
