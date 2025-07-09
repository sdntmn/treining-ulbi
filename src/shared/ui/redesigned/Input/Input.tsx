import React, { InputHTMLAttributes, ReactNode, memo, useEffect, useRef, useState } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import { HStack } from "../Stack"
import { Text } from "../Text"
import "./Input.module.scss"

// Omit позволяет забрать все пропсы, но какие то исключить
type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly" | "size"
>

type InputSize = "s" | "m" | "l"

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  autofocus?: boolean
  isReadonly?: boolean
  addonLeft?: ReactNode
  addonRight?: ReactNode
  label?: string
  size?: InputSize
}

export const Input: React.FC<InputProps> = memo(function Input(props: InputProps) {
  const {
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    autofocus,
    isReadonly,
    addonLeft,
    addonRight,
    label,
    size = "m",
    ...otherProps
  } = props
  const ref = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  const onFocus = () => {
    setIsFocused(true)
  }

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true)
      ref.current?.focus()
    }
  }, [autofocus])

  const input = (
    <div
      className={cn("input", [
        className,
        isReadonly && "input__readonly",
        isFocused && "input__focused",
        Boolean(addonLeft) && "input__with-addon-left",
        Boolean(addonRight) && "input__with-addon-right",
        size && `input__size_${size}`,
      ])}
    >
      {addonLeft && <div className="input__addon-left"> {addonLeft}</div>}
      <input
        ref={ref}
        type={type}
        value={value}
        readOnly={isReadonly}
        className="input__tag"
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChangeHandler}
        placeholder={placeholder}
        {...otherProps}
      />

      {addonRight && <div className="input__addon-right">{addonRight}</div>}
    </div>
  )

  if (label) {
    return (
      <HStack max gap="8">
        <Text text={label} />
        {input}
      </HStack>
    )
  }

  return input
})
