import { memo, ReactElement } from "react"

import { cn } from "@/shared/lib/classNames/classNames"

import "./MainLayout.module.scss"

interface Props {
  className?: string
  header: ReactElement
  content: ReactElement
  sidebar: ReactElement
  toolbar?: ReactElement
}

export const MainLayout = memo((props: Props) => {
  const { className, content, toolbar, header, sidebar } = props

  return (
    <div className={cn("main-layout", [className])}>
      <div className="main-layout__content">{content}</div>
      <div className="main-layout__sidebar">{sidebar}</div>
      <div className="main-layout__rightbar">
        <div className="main-layout__header">{header}</div>
        <div className="main-layout__toolbar">{toolbar}</div>
      </div>
    </div>
  )
})

MainLayout.displayName = "MainLayout"
