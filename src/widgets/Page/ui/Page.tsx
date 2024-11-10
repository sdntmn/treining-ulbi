import React, { MutableRefObject, ReactNode, useRef } from "react"
import { cn } from "shared/lib/classNames/classNames"

import "./Page.module.scss"

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page: React.FC<PageProps> = ({
  className,
  children,
  onScrollEnd,
}: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  // const dispatch = useAppDispatch()
  // const { pathname } = useLocation()
  // const scrollPosition = useSelector((state: StateSchema) =>
  //   getScrollPageByPath(state, pathname)
  // )

  // useInfiniteScroll({
  //   triggerRef,
  //   wrapperRef,
  //   callback: onScrollEnd,
  // })

  // useInitialEffect(() => {
  //   wrapperRef.current.scrollTop = scrollPosition
  // })

  // const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
  //   dispatch(
  //     scrollPageActions.setScrollPosition({
  //       position: e.currentTarget.scrollTop,
  //       path: pathname,
  //     })
  //   )
  // }, 500)

  return (
    <section
      ref={wrapperRef}
      className={cn("page", [className])}
      // onScroll={onScroll}
    >
      {children}
      {onScrollEnd ? (
        <div className={"page__trigger"} ref={triggerRef}></div>
      ) : null}
    </section>
  )
}
