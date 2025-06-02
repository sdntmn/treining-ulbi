/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react"

export function useDebounce<T extends any[]>(callback: (...args: T) => void, delay: number) {
  const timer = useRef<number | undefined>()

  return useCallback(
    (...args: T) => {
      if (timer.current !== undefined) {
        window.clearTimeout(timer.current)
      }
      timer.current = window.setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )
}
