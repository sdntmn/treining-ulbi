import React, { ChangeEvent, memo, useMemo } from "react"
import { cn } from "shared/lib/classNames/classNames"

import "./Select.module.scss"

export interface SelectOptions {
  value: string
  content: string
}
interface SelectProps {
  className?: string
  label?: string
  options?: SelectOptions[]
  isReadonly?: boolean
  value?: string
  onChange?: (value: string) => void
}

export const Select: React.FC<SelectProps> = memo(function Select(
  props: SelectProps
) {
  const { className, label, options, value, isReadonly, onChange } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  }

  const optionsList = useMemo(() => {
    return options?.map((valOption) => (
      <option
        className=" select__option"
        value={valOption.value}
        key={valOption.value}
      >
        {valOption.content}
      </option>
    ))
  }, [options])

  return (
    <div className={cn("select", [className])}>
      {label && (
        <span className={cn("select__label", [className])}>{label + ">"}</span>
      )}
      <select
        className="select__input"
        value={value}
        disabled={isReadonly}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  )
})
