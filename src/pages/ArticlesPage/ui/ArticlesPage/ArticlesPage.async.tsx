/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lazy } from "react"

export const ArticlesPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-expect-error
      // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
      setTimeout(() => resolve(import("./ArticlesPage")), 1500)
    })
)
