import { memo } from "react"
import { cn } from "shared/lib/classNames/classNames"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { VStack } from "shared/ui/Stack"

import { useNotifications } from "../../api/notificationApi"
import { NotificationItem } from "../NotificationItem/NotificationItem"

import "./NotificationList.module.scss"

interface NotificationListProps {
  className?: string
}

export const NotificationList: React.FC<NotificationListProps> = memo(
  (props: NotificationListProps) => {
    const { className } = props

    const { data, isLoading = true } = useNotifications(null, {
      pollingInterval: 10000,
    })

    if (isLoading) {
      return (
        <VStack gap="16" max className={cn("notification-list", [className])}>
          <Skeleton width="100%" border="8px" height="80px" />

          <Skeleton width="100%" border="8px" height="80px" />

          <Skeleton width="100%" border="8px" height="80px" />
        </VStack>
      )
    }

    return (
      <VStack gap="16" max className={cn("notification-list", [className])}>
        {data?.map((item) => <NotificationItem key={item.id} item={item} />)}
      </VStack>
    )
  }
)

NotificationList.displayName = "NotificationList"
