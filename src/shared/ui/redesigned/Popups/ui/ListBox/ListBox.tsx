import { Listbox as HListBox } from "@headlessui/react"
import { Fragment, ReactNode, useMemo } from "react"

import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { DropdownDirection } from "@/shared/types/ui"

import { Button } from "../../../Button"
import { Icon } from "../../../Icon"
import { HStack } from "../../../Stack"
import { mapDirectionClass } from "../../styles/consts"

import "../../styles/Popup.module.scss"
import "./ListBox.module.scss"

export interface ListBoxItem<T extends string> {
  value: T
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[]
  className?: string
  value?: T
  defaultValue?: string
  onChange?: (value: T) => void
  readonly?: boolean
  direction?: DropdownDirection
  label?: string
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = "bottom right",
    label,
  } = props

  const optionsClasses = [mapDirectionClass[direction], "popup__menu"]

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value)
  }, [items, value])

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={cn("list-box", [className, "popup"])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button disabled={readonly} className="list-box__trigger">
          <Button variant="filled" disabled={readonly} addonRight={<Icon Svg={ArrowIcon} />}>
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={cn("list-box__options ", optionsClasses)}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={cn("list-box__item", [
                    active && "popup_active",
                    item.disabled && "popup_disable",
                    selected && "list-box__selected",
                  ])}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  )
}
