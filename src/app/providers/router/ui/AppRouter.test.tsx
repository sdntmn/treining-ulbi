/* eslint-disable @typescript-eslint/no-unused-expressions */
import { screen } from "@testing-library/react"

import { UserRole } from "@/shared/const/enums"
import { getRouteAdmin, getRouteMain, getRouteProfile } from "@/shared/const/routes"
import { ComponentRender } from "@/shared/lib/tests/ComponentRender/ComponentRender"

import AppRouter from "./AppRouter"

describe("app/router/AppRouter", () => {
  test("Страница отрисовывается", async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteMain(),
    })

    const page = await screen.findByTestId("MainPage")
    expect(page).toBeInTheDocument()
  })

  test("Страница не найдена", async () => {
    ComponentRender(<AppRouter />, {
      route: "/not-exist-page",
    })

    const page = await screen.findByTestId("NotFoundPage")
    expect(page).toBeInTheDocument()
  })

  test("Страница запрещена для неавторизованного пользователя", async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteProfile("1"),
    })

    const page = await screen.findByTestId("MainPage")
    expect(page).toBeInTheDocument()
  })

  test("Страница профиля доступна для авторизованного пользователя", async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteProfile("1"),
      initialState: {
        user: {
          authData: {
            id: "1",
          },
        },
      },
    })

    const page = await screen.findByTestId("ProfilePage")
    expect(page).toBeInTheDocument()
  })

  test("Доступ запрещен (отсутствует роль)", async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          authData: {},
        },
      },
    })

    const page = await screen.findByTestId("ForbiddenPage")
    expect(page).toBeInTheDocument()
  })

  test("Страница админки доступна для пользователя с соответствующей ролью", async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          authData: {
            id: "1",
            roles: [UserRole.ADMIN],
          },
        },
      },
    })

    const page = await screen.findByTestId("AdminPanelPage")
    expect(page).toBeInTheDocument()
  })
})
