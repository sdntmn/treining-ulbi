import React from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import { Loader } from "@/shared/ui/deprecated/Loader"
import "./PageLoader.module.scss"

interface PageLoaderProps {
  className?: string
}

export const PageLoader: React.FC<PageLoaderProps> = ({ className }: PageLoaderProps) => (
  <div className={cn("page-loader", [className])}>
    <Loader />
  </div>
)
