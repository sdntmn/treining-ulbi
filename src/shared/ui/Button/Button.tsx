import React, { ButtonHTMLAttributes, memo } from "react"

import { cn } from "../../lib/classNames/classNames"

import "./Button.module.scss"

export enum ButtonVar {
  CLEAR = "clear",
  OUTLINE = "outline",
  OUTLINE_ERROR = "outline-error",
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
  fullWidth?: boolean
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = memo(function Button({
  className,
  children,
  buttonVar = ButtonVar.PRIMARY,
  square,
  size = ButtonSize.M,
  fontSize = ButtonFontSize.FONT_M,
  disabled,
  fullWidth,
  ...otherProps
}: ButtonProps) {
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
        fullWidth && "button__fullWidth",
      ])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
})
