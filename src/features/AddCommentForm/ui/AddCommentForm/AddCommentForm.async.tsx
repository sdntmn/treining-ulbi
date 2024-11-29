/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, lazy } from "react"

import { AddCommentFormProps } from "./AddCommentForm"

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(
  () =>
    new Promise((resolve) => {
      // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
      setTimeout(() => resolve(import("./AddCommentForm")), 1500)
    })
)
