import React, { ButtonHTMLAttributes } from "react"

import { cn } from "../../lib/classNames/classNames"
import cls from "./Button.module.scss"

export enum ButtonVar {
  CLEAR = "clear",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  buttonVar?: ButtonVar
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, buttonVar, ...otherProps } = props

  return (
    <button
      type="button"
      className={cn(cls.button, { [cls[buttonVar]]: true }, [className])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
