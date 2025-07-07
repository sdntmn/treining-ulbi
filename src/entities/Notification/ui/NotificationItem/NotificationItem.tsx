import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { ToggleFeaturesComponent } from "@/shared/lib/features"
import { Card as CardDeprecated, CardTheme } from "@/shared/ui/deprecated/Card"
import { TextParagraf as TextParagrafDeprecated } from "@/shared/ui/deprecated/TextParagraf"
import { Card } from "@/shared/ui/redesigned/Card"
import { Text } from "@/shared/ui/redesigned/Text"

import { Notification } from "../../model/types/notification"
import "./NotificationItem.module.scss"

interface NotificationItemProps {
  className?: string
  item: Notification
}

export const NotificationItem: React.FC<NotificationItemProps> = memo(
  (props: NotificationItemProps) => {
    const { className, item } = props

    const content = (
      <ToggleFeaturesComponent
        feature={"isAppRedesigned"}
        on={
          <Card className={cn("notification-item", [className])} max>
            <Text title={item.title} text={item.description} />
          </Card>
        }
        off={
          <CardDeprecated
            theme={CardTheme.OUTLINED}
            className={cn("notification-item", [className])}
            max
          >
            <TextParagrafDeprecated title={item.title} text={item.description} />
          </CardDeprecated>
        }
      />
    )

    if (item.href) {
      return (
        <a className={"notification-item__link"} target="_blank" href={item.href} rel="noreferrer">
          {content}
        </a>
      )
    }

    return content
  }
)

NotificationItem.displayName = "NotificationItem"
