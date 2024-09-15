import { cn } from "shared/lib/helpers/classNames/classNames"
import { Loader } from "shared/ui/Loader/Loader"

import "./PageLoader.module.scss"

interface PageLoaderProps {
  className?: string
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div className={cn("page-lLoader", {}, [className])}>
    <Loader />
  </div>
)
