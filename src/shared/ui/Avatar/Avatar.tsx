import React, { CSSProperties, useMemo } from "react"
import { cn } from "shared/lib/classNames/classNames"

import "./Avatar.module.scss"

interface AvatarProps {
  className?: string
  src?: string
  alt?: string
  size?: number
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  alt,
  size,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size || 100,
      height: size || 100,
    }
  }, [size])

  return (
    <img
      src={src}
      alt={alt}
      style={styles}
      className={cn("avatar", [className])}
    />
  )
}
