import { ChangeEvent, useMemo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import "./Select.module.scss"

export interface SelectOptions {
  value: string
  content: string
}
interface SelectProps<T extends string> {
  className?: string
  label?: string
  options?: SelectOptions[]
  isReadonly?: boolean
  value?: T
  onChange?: (value: T) => void
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, label, options, value, isReadonly, onChange } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T)
  }

  const optionsList = useMemo(() => {
    return options?.map((valOption) => (
      <option className=" select__option" value={valOption.value} key={valOption.value}>
        {valOption.content}
      </option>
    ))
  }, [options])

  return (
    <div className={cn("select", [className])}>
      {label && <span className={cn("select__label", [className])}> {label}</span>}
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
}
