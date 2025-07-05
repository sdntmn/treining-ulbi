import React, { MutableRefObject, ReactNode, SyntheticEvent, useRef } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

import { PAGE_ID } from "@/shared/const/string"
import { cn } from "@/shared/lib/classNames/classNames"
import { toggleFeatures } from "@/shared/lib/features"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll"
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useThrottle } from "@/shared/lib/hooks/useThrottle/useThrottle"
import { TestProps } from "@/shared/types/tests"

// eslint-disable-next-line paths-import/imports-layers
import { StateSchema } from "@/app/providers/StoreProvider"

import { getScrollByPath, scrollSaveActions } from "@/features/ScrollSave"

import "./Page.module.scss"

interface PageProps extends TestProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page: React.FC<PageProps> = (props: PageProps) => {
  const { className, children, onScrollEnd } = props
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, pathname))

  const onScroll = useThrottle((e: SyntheticEvent<HTMLElement>) => {
    const scrollPosition = Math.round(e.currentTarget.scrollTop)
    dispatch(
      scrollSaveActions.setScrollPosition({
        position: scrollPosition,
        path: pathname,
      })
    )
  }, 500)

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  })

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  const classPage = toggleFeatures<string>({
    name: "isAppRedesigned",
    on: () => "page-redesigned",
    off: () => "page",
  })

  return (
    <main
      ref={wrapperRef}
      className={cn(classPage, [className])}
      onScroll={onScroll}
      id={PAGE_ID}
      data-testid={props["data-testid"] ?? "Page"}
    >
      {children}
      {onScrollEnd ? <div className={"page__trigger"} ref={triggerRef}></div> : null}
    </main>
  )
}
