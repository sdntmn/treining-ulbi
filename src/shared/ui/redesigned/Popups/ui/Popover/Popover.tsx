import { Popover as HPopover } from "@headlessui/react"
import React, { ReactNode } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { DropdownDirection } from "@/shared/types/ui"

import { mapDirectionClass } from "../../styles/consts"

import "../../styles/Popup.module.scss"
import "./Popover.module.scss"

interface PopoverProps {
  className?: string
  direction?: DropdownDirection
  trigger: ReactNode
  children: ReactNode
}

export const Popover: React.FC<PopoverProps> = (props: PopoverProps) => {
  const { className, trigger, direction = "bottom right", children } = props

  const menuClasses = [mapDirectionClass[direction], " popup--menu"]

  return (
    <HPopover className={cn("", [className, "popup"])}>
      <HPopover.Button className={"popup__trigger"}>{trigger}</HPopover.Button>

      <HPopover.Panel className={cn("popover", menuClasses)}>{children}</HPopover.Panel>
    </HPopover>
  )
}
