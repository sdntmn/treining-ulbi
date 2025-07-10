import React, { memo, useCallback, useState } from "react"
import { BrowserView, MobileView } from "react-device-detect"

import NotificationIcon from "@/shared/assets/icons/notification-icon.svg"
import NotificationIconDeprecated from "@/shared/assets/icons/notification.svg"
import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { Button as ButtonDeprecated } from "@/shared/ui/deprecated/Button"
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon"
import { Popover as PopoverDeprecated } from "@/shared/ui/deprecated/Popups"
import { Drawer } from "@/shared/ui/redesigned/Drawer"
import { Icon } from "@/shared/ui/redesigned/Icon"
import { Popover } from "@/shared/ui/redesigned/Popups"

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

    const trigger = (
      <ToggleFeaturesComponent
        feature={"isAppRedesigned"}
        on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
        off={<IconDeprecated Svg={NotificationIconDeprecated} inverted />}
      />
    )

    return (
      <div>
        <BrowserView>
          <ToggleFeaturesComponent
            feature={"isAppRedesigned"}
            on={
              <Popover
                className="button-notification"
                direction="bottom left"
                trigger={<span onClick={onOpenDrawer}>{trigger}</span>}
              >
                <NotificationList className={cn("button-notification__popover", [className])} />
              </Popover>
            }
            off={
              <PopoverDeprecated
                className="button-notification"
                direction="bottom left"
                trigger={<span onClick={onOpenDrawer}>{trigger}</span>}
              >
                <NotificationList className={cn("button-notification__popover", [className])} />
              </PopoverDeprecated>
            }
          />
        </BrowserView>
        <MobileView>
          <ButtonDeprecated onClick={onOpenDrawer}> {trigger}</ButtonDeprecated>

          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <NotificationList />
          </Drawer>
        </MobileView>
      </div>
    )
  }
)

ButtonNotification.displayName = "ButtonNotification"
