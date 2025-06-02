import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react"

type SpringType = typeof import("@react-spring/web")
type GestureType = typeof import("@use-gesture/react")

interface AnimationContextPayload {
  Gesture?: GestureType
  Spring?: SpringType
  isLoaded?: boolean
  error?: Error
}

const AnimationContext = createContext<AnimationContextPayload>({})

// Обе либы зависят друг от друга
const getAsyncAnimationModules = async () => {
  return Promise.all([import("@react-spring/web"), import("@use-gesture/react")])
}

export const useAnimationLibs = () => {
  const context = useContext(AnimationContext)
  return context as Required<AnimationContextPayload>
}

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const SpringRef = useRef<SpringType>()
  const GestureRef = useRef<GestureType>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    getAsyncAnimationModules()
      .then(([Spring, Gesture]) => {
        SpringRef.current = Spring
        GestureRef.current = Gesture
        setIsLoaded(true)
      })
      .catch((error) => {
        setError(error)
        console.error("Failed to load animation libraries:", error)
      })
  }, [])

  const value = useMemo(
    () => ({
      Gesture: GestureRef.current,
      Spring: SpringRef.current,
      isLoaded,
      error,
    }),
    [isLoaded, error]
  )

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>
}
