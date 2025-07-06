import React, { ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState } from "react"

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  fallback?: ReactElement
  errorFallback?: ReactElement
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const AppImage: React.FC<AppImageProps> = memo((props: AppImageProps) => {
  const { className, src, alt = "image", errorFallback, fallback, ...otherProps } = props
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // useLayoutEffect вызывается еще до того как компонент вмонтирован
  useLayoutEffect(() => {
    const img = new Image()
    img.src = src ?? ""
    img.onload = () => {
      setIsLoading(false)
    }
    img.onerror = () => {
      setIsLoading(false)
      setHasError(true)
    }
  }, [src])

  if (isLoading && fallback) {
    return fallback
  }

  if (hasError && errorFallback) {
    return errorFallback
  }

  return <img className={className} src={src} alt={alt} {...otherProps} />
})

AppImage.displayName = "AppImage"
