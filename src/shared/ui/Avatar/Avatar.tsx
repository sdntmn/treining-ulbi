import React, { CSSProperties, useMemo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import UserIcon from "../../assets/icons/user-avatar.svg"
import { AppImage } from "../AppImage"
import { Icon } from "../Icon"
import { Skeleton } from "../Skeleton"

import "./Avatar.module.scss"

interface AvatarProps {
  className?: string
  src?: string
  alt?: string
  size?: number
  fallbackInverted?: boolean
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  alt,
  size = 100,
  fallbackInverted,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    }
  }, [size])

  const fallBack = <Skeleton width={size} height={size} border={"50%"} />
  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      width={size}
      height={size}
      Svg={UserIcon}
    />
  )

  return (
    <AppImage
      src={src}
      alt={alt}
      style={styles}
      className={cn("avatar", [className])}
      fallback={fallBack}
      errorFallback={errorFallback}
    />
  )
}
