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

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Popover: React.FC<PopoverProps> = (props: PopoverProps) => {
  const { className, trigger, direction = "bottom right", children } = props

  const menuClasses = [mapDirectionClass[direction]]

  return (
    <HPopover className={cn("", [className, "popup-deprecated"])}>
      <HPopover.Button className={"popup-deprecated__trigger"}>{trigger}</HPopover.Button>

      <HPopover.Panel className={cn("popover-deprecated", menuClasses)}>{children}</HPopover.Panel>
    </HPopover>
  )
}
