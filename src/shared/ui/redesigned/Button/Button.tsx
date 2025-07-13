import React, { ButtonHTMLAttributes, ForwardedRef, ReactNode, forwardRef } from "react"

import { ButtonColor, ButtonSize, ButtonVariant } from "@/shared/types/type"

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
  color?: ButtonColor
}

export const Button: React.FC<ButtonProps> = forwardRef(
  (
    {
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
      color = "normal",
      ...otherProps
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
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
          color && `button__color_${color}`,
          Boolean(addonLeft) && "button__with-addon-left",
          Boolean(addonRight) && "button__with-addon-right",
        ])}
        disabled={disabled}
        ref={ref}
        {...otherProps}
      >
        {addonLeft && <div className="button__addon-left"> {addonLeft}</div>}
        {children}
        {addonRight && <div className="button__addon-right">{addonRight}</div>}
      </button>
    )
  }
)

Button.displayName = "Button"
