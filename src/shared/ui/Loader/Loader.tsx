import { cn } from "shared/lib/helpers/classNames/classNames"

import "./Loader.scss"

interface LoaderProps {
  className?: string
}

export const Loader = ({ className }: LoaderProps) => (
  <div className={cn("lds-ellipsis", {}, [className])}>
    <div />
    <div />
    <div />
    <div />
  </div>
)
