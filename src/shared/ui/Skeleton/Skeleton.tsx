import React, { CSSProperties, memo } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import "./Skeleton.module.scss"

interface SkeletonProps {
  className?: string
  height?: string | number
  width?: string | number
  border?: string
}

export const Skeleton: React.FC<SkeletonProps> = memo(function Skeleton(
  props: SkeletonProps
) {
  const { className, height, width, border } = props

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  }

  return <div className={cn("skeleton", [className])} style={styles} />
})
