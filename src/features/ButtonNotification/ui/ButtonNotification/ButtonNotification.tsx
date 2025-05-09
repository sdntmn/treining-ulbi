import { NotificationList } from "entities/Notification"
import React, { memo } from "react"
import NotificationIcon from "shared/assets/icons/notification.svg"
import { cn } from "shared/lib/classNames/classNames"
import { Icon } from "shared/ui/Icon/Icon"
import { Popover } from "shared/ui/Popups"

import "./ButtonNotification.module.scss"

interface NotificationButtonProps {
  className?: string
}

export const ButtonNotification: React.FC<NotificationButtonProps> = memo(
  (props: NotificationButtonProps) => {
    const { className } = props

    return (
      <Popover
        className="button-notification"
        direction="bottom left"
        trigger={<Icon Svg={NotificationIcon} inverted />}
      >
        <NotificationList className={cn("", [className])} />
      </Popover>
    )
  }
)

ButtonNotification.displayName = "ButtonNotification"
