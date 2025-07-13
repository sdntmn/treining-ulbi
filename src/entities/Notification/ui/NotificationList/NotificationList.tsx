import React, { memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { toggleFeatures } from "@/shared/lib/features"
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton"
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton"
import { VStack } from "@/shared/ui/redesigned/Stack"

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

    const Skeleton = toggleFeatures({
      name: "isAppRedesigned",
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    })

    if (isLoading) {
      return (
        <VStack gap="16" className={cn("notification-list", [className])}>
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
