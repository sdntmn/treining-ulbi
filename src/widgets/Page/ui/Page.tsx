import { StateSchema } from "app/providers/StoreProvider"
import { getScrollByPath, scrollSaveActions } from "features/ScrollSave"
import React, {
  MutableRefObject,
  ReactNode,
  SyntheticEvent,
  useRef,
} from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { cn } from "shared/lib/classNames/classNames"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle"

import "./Page.module.scss"

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const PAGE_ID = "PAGE_ID"

export const Page: React.FC<PageProps> = ({
  className,
  children,
  onScrollEnd,
}: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const scrollPosition = useSelector((state: StateSchema) =>
    getScrollByPath(state, pathname)
  )

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

  return (
    <section
      ref={wrapperRef}
      className={cn("page", [className])}
      onScroll={onScroll}
      id={PAGE_ID}
    >
      {children}
      {onScrollEnd ? (
        <div className={"page__trigger"} ref={triggerRef}></div>
      ) : null}
    </section>
  )
}
