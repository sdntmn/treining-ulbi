import { MutableRefObject, useCallback, useEffect, useRef } from "react"

type Throttle<T extends unknown[]> = (...args: T) => void

export const useThrottle = <T extends unknown[]>(
  callback: Throttle<T>,
  delay: number
) => {
  const throttleRef = useRef(false)
  const timeoutRef: MutableRefObject<NodeJS.Timeout | undefined> =
    useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useCallback(
    (...args: T) => {
      if (!throttleRef.current) {
        callback(...args)
        throttleRef.current = true

        timeoutRef.current = setTimeout(() => {
          throttleRef.current = false
        }, delay)
      }
    },
    [callback, delay]
  )
}
