import { Listbox as HListBox } from "@headlessui/react"
import React, { Fragment, ReactNode } from "react"
import { cn } from "shared/lib/classNames/classNames"

import { HStack } from "../Stack"

import "./ListBox.module.scss"

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

type DropdownDirection = "top" | "bottom"

interface ListBoxProps {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  onChange: (value: string) => void
  isReadonly?: boolean
  direction?: DropdownDirection
  label?: string
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  bottom: "list-box__options-bottom",
  top: "list-box__options-top",
}

export const ListBox: React.FC<ListBoxProps> = (props: ListBoxProps) => {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    isReadonly,
    direction = "bottom",
    label,
  } = props

  const optionsClasses = [mapDirectionClass[direction]]

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={isReadonly}
        as="div"
        className={cn("list-box", [className])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button disabled={isReadonly} className="list-box__trigger">
          {value ?? defaultValue}
          {/* <Button disabled={isReadonly}>{value ?? defaultValue}</Button> */}
        </HListBox.Button>
        <HListBox.Options className={cn("list-box__options", optionsClasses)}>
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
                    active && "list-box_active",
                    item.disabled && "list-box_disabled",
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
