import React from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import "./Loader.scss"

interface LoaderProps {
  className?: string
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Loader: React.FC<LoaderProps> = ({ className }: LoaderProps) => (
  <div className={cn("lds-ellipsis", [className])}>
    <div />
    <div />
    <div />
    <div />
  </div>
)
