import React, { memo, ReactNode, useCallback, useEffect } from "react"

import { cn } from "@/shared/lib/classNames/classNames"
import {
  AnimationProvider,
  useAnimationLibs,
} from "@/shared/lib/components/AnimationProvider"

import { useTheme } from "../../lib/hooks/useTheme/useTheme"
import { Overlay } from "../Overlay/Overlay"
import { Portal } from "../Portal/Portal"

import "./Drawer.module.scss"

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

const height = window.innerHeight - 100

export const DrawerContent: React.FC<DrawerProps> = memo(
  (props: DrawerProps) => {
    const { className, children, onClose, isOpen } = props
    const { theme } = useTheme()

    const { Spring, Gesture } = useAnimationLibs()

    const [{ y }, api] = Spring.useSpring(() => ({ y: height }))

    const openDrawer = useCallback(() => {
      api.start({ y: 0, immediate: false })
    }, [api])

    const close = (velocity = 0) => {
      api.start({
        y: height,
        immediate: false,
        config: { ...Spring.config.stiff, velocity },
        onResolve: onClose,
      })
    }

    const bind = Gesture.useDrag(
      ({
        last,
        velocity: [, vy],
        direction: [, dy],
        movement: [, my],
        cancel,
      }) => {
        if (my < -70) cancel()

        if (last) {
          if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
            close()
          } else {
            openDrawer()
          }
        } else {
          api.start({ y: my, immediate: true })
        }
      },
      {
        from: () => [0, y.get()],
        filterTaps: true,
        bounds: { top: 0 },
        rubberband: true,
      }
    )

    useEffect(() => {
      if (isOpen) {
        openDrawer()
      }
    }, [api, isOpen, openDrawer])

    if (!isOpen) {
      return null
    }

    const display = y.to((py) => (py < height ? "block" : "none"))

    return (
      <Portal>
        <div
          className={cn("drawer", [
            className,
            theme,
            "app_drawer",
            isOpen && "drawer_opened",
            // isClosing && "drawer_closing",
          ])}
        >
          <Overlay onClick={close} />
          <Spring.a.div
            className="drawer__sheet"
            style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
            {...bind()}
          >
            {children}
          </Spring.a.div>
        </div>
      </Portal>
    )
  }
)

DrawerContent.displayName = "DrawerContent"

export const DrawerAsync = (props: DrawerProps) => {
  const { isLoaded, error } = useAnimationLibs()

  if (!isLoaded || error) {
    return null
  }

  return <DrawerAsync {...props} />
}

export const Drawer = (props: DrawerProps) => {
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />
    </AnimationProvider>
  )
}
