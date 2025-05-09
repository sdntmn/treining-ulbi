import { memo } from "react"
import { cn } from "shared/lib/classNames/classNames"
import { Card, CardTheme } from "shared/ui/Card/Card"
import { TextParagraf } from "shared/ui/TextParagraf/TextParagraf"

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
      <Card
        theme={CardTheme.OUTLINED}
        className={cn("notification-item", [className])}
      >
        <TextParagraf title={item.title} text={item.description} />
      </Card>
    )

    if (item.href) {
      return (
        <a
          className={"notification-item__link"}
          target="_blank"
          href={item.href}
          rel="noreferrer"
        >
          {content}
        </a>
      )
    }

    return content
  }
)

NotificationItem.displayName = "NotificationItem"
