import { Listbox as HListBox } from "@headlessui/react"
import React, { Fragment, ReactNode } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { DropdownDirection } from "@/shared/types/ui"

import { HStack } from "../../../Stack"
import { mapDirectionClass } from "../../styles/consts"

import "../../styles/Popup.module.scss"
import "./ListBox.module.scss"

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  onChange: (value: string) => void
  readonly?: boolean
  direction?: DropdownDirection
  label?: string
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const ListBox: React.FC<ListBoxProps> = (props: ListBoxProps) => {
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

  const optionsClasses = [mapDirectionClass[direction]]

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
          {value ?? defaultValue}
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
                  ])}
                >
                  {selected && "!!!"}
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
