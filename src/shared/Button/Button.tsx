import { memo, type ButtonHTMLAttributes, type FC, type ReactNode } from "react"
import { cn } from "shared/lib/helpers/classNames/classNames"

import cls from "./Button.module.scss"

export enum ButtonVar {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OUTLINE = "outline",
  OUTLINE_RED = "outlineRed",
  BACKGROUND = "background",
  BACKGROUND_DARK = "backgroundDark",
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  buttonVar?: ButtonVar
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
  children?: ReactNode
}

export const Button: FC<ButtonProps> = memo(function Button(
  props: ButtonProps
) {
  const {
    className,
    children,
    buttonVar = ButtonVar.OUTLINE,
    square,
    size = ButtonSize.M,
    disabled,
    ...otherProps
  } = props

  const mods = {
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
  }

  return (
    <button
      type="button"
      className={cn("button", mods, [`button__${buttonVar}`, className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
})
