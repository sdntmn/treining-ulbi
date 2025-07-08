import React, {
  InputHTMLAttributes,
  SyntheticEvent,
  memo,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import "./Input.module.scss"

// Omit позволяет забрать все пропсы, но какие то исключить
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly">

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  autofocus?: boolean
  isReadonly?: boolean
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
    ...otherProps
  } = props
  const ref = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [caretPosition, setCaretPosition] = useState(0)

  const isCaretVisible = isFocused && !isReadonly

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
    setCaretPosition(e.target.value.length)
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  const onFocus = () => {
    setIsFocused(true)
  }
  const onSelect = (e: SyntheticEvent<HTMLInputElement, Event>) => {
    setCaretPosition(e?.currentTarget?.selectionStart || 0)
  }

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true)
      ref.current?.focus()
    }
  }, [autofocus])

  return (
    <div className={cn("input", [className, isReadonly ? "input__readonly" : ""])}>
      {placeholder && <div className="input__placeholder">{`${placeholder}`}</div>}
      <div className="input__caret-wrapper">
        <input
          ref={ref}
          type={type}
          value={value}
          readOnly={isReadonly}
          className="input__tag"
          onBlur={onBlur}
          onFocus={onFocus}
          onSelect={onSelect}
          onChange={onChangeHandler}
          {...otherProps}
        />
        {isCaretVisible && (
          <span className="input__caret" style={{ left: `${caretPosition * 8}px` }} />
        )}
      </div>
    </div>
  )
})
