import { StateSchema } from "@/app/providers/StoreProvider"

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "./articleDetails"

describe("Тест: данные статьи", () => {
  test("Возвращает данные статьи", () => {
    const data = {
      id: "1",
      title: "subtitle",
    }
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data,
      },
    }
    expect(getArticleDetailsData(state as StateSchema)).toEqual(data)
  })
  test("Работает с пустым состоянием данных", () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined)
  })
  test("Возвращает сообщение об ошибке из состояния", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: "error",
      },
    }
    expect(getArticleDetailsError(state as StateSchema)).toEqual("error")
  })
  test("Возвращает `undefined`, если ошибка отсутствует", () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined)
  })
  test("Возвращает флаг загрузки из состояния", () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    }
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true)
  })
  test("should work with empty state isLoading", () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false)
  })
})
