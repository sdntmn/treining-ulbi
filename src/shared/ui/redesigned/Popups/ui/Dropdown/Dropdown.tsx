import { Menu } from "@headlessui/react"
import React, { Fragment, ReactNode } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { DropdownDirection } from "@/shared/types/ui"

import { AppLink } from "../../../AppLink/index"
import { mapDirectionClass } from "../../styles/consts"

import "../../styles/Popup.module.scss"
import "./Dropdown.module.scss"

export interface DropdownItem {
  disabled?: boolean
  content?: ReactNode
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  className?: string
  items: DropdownItem[]
  direction?: DropdownDirection
  trigger: ReactNode
}

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { className, trigger, items, direction = "bottom right" } = props

  const menuClasses = [mapDirectionClass[direction], "drop-down__menu"]

  return (
    <Menu as="div" className={cn("drop-down", [className, "popup"])}>
      <Menu.Button className={"popup__trigger"}>{trigger}</Menu.Button>

      <Menu.Items className={cn("popup__menu", menuClasses)}>
        {items.map((item, index: number) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              key={`dropdown-key-${index}`}
              type="button"
              disabled={item.disabled}
              onClick={item.onClick}
              className={cn("drop-down__item", [active && "popup_active"])}
            >
              {item.content}
            </button>
          )

          if (item.href) {
            return (
              <Menu.Item
                refName="href"
                key={`dropdown-key-${index}`}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            )
          }

          return (
            <Menu.Item key={index} as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}
