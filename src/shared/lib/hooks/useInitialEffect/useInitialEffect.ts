import { useEffect } from "react"

export function useInitialEffect(cb: () => void) {
  useEffect(() => {
    if (__PROJECT__ !== "storybook" && __PROJECT__ !== "jest") {
      cb()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
