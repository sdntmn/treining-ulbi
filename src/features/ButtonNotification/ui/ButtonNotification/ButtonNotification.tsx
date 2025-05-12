import React, { memo, useCallback, useState } from "react"
import { BrowserView, MobileView } from "react-device-detect"

import NotificationIcon from "@/shared/assets/icons/notification.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { Button } from "@/shared/ui/Button/Button"
import { Drawer } from "@/shared/ui/Drawer/Drawer"
import { Icon } from "@/shared/ui/Icon/Icon"
import { Popover } from "@/shared/ui/Popups"

import { NotificationList } from "@/entities/Notification"

import "./ButtonNotification.module.scss"

interface NotificationButtonProps {
  className?: string
}

export const ButtonNotification: React.FC<NotificationButtonProps> = memo(
  (props: NotificationButtonProps) => {
    const { className } = props

    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
      setIsOpen(true)
    }, [])

    const onCloseDrawer = useCallback(() => {
      setIsOpen(false)
    }, [])

    const trigger = <Icon Svg={NotificationIcon} inverted />

    return (
      <div>
        <BrowserView>
          <Popover
            className="button-notification"
            direction="bottom left"
            trigger={<span onClick={onOpenDrawer}>{trigger}</span>}
          >
            <NotificationList className={cn("", [className])} />
          </Popover>
        </BrowserView>
        <MobileView>
          <Button onClick={onOpenDrawer}> {trigger}</Button>

          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <NotificationList />
          </Drawer>
        </MobileView>
      </div>
    )
  }
)

ButtonNotification.displayName = "ButtonNotification"
