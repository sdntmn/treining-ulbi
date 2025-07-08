import React, { ButtonHTMLAttributes, memo, ReactNode } from "react"

import { ButtonSize, ButtonVariant } from "@/shared/types/type"

import { cn } from "../../../lib/classNames/classNames"

import "./Button.module.scss"

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
  variant?: ButtonVariant
  square?: ButtonSquare
  children?: React.ReactNode
  fontSize?: ButtonFontSize
  size?: ButtonSize
  fullWidth?: boolean
  disabled?: boolean
  addonLeft?: ReactNode
  addonRight?: ReactNode
}

export const Button: React.FC<ButtonProps> = memo(function Button({
  className,
  children,
  variant = "outline",
  square,
  size = "m",
  fontSize = ButtonFontSize.FONT_M,
  disabled,
  fullWidth,
  addonLeft,
  addonRight,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn("button", [
        className,
        variant && `button__${variant}`,
        square && `button__${square}`,
        fontSize && `button__${fontSize}`,
        size && `button__size_${size}`,
        disabled && "button__disabled",
        fullWidth && "button__fullWidth",
        Boolean(addonLeft) && "button__with-addon-left",
        Boolean(addonRight) && "button__with-addon-right",
      ])}
      disabled={disabled}
      {...otherProps}
    >
      {addonLeft && <div className="button__addon-left"> {addonLeft}</div>}
      {children}
      {addonRight && <div className="button__addon-right">{addonRight}</div>}
    </button>
  )
})
