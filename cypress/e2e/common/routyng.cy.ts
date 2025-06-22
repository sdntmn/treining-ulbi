import { selectByTestId } from "cypress/helpers/selectByTestId"

describe("Роутинг", () => {
  describe("Пользователь НЕ авторизован", () => {
    it("Переход на главную страницу", () => {
      cy.visit("/")
      cy.get(selectByTestId("MainPage")).should("exist")
    })
    it("Редирект при попытке перехода на страницу Профиля", () => {
      cy.visit("/profile/1")
      cy.get(selectByTestId("MainPage")).should("exist")
    })
    it("Редирект при попытке открыть не существующую страницу", () => {
      cy.visit("/qwerty")
      cy.get(selectByTestId("NotFoundPage")).should("exist")
    })
  })

  describe("Пользователь авторизован", () => {
    beforeEach(() => {
      cy.login("testuser", "123")
    })
    it("Переход на страницу Профиля", () => {
      cy.visit("/profile/4")
      cy.get(selectByTestId("ProfilePage")).should("exist")
    })
    it("Переход на страницу со списком статей", () => {
      cy.visit("/articles")
      cy.get(selectByTestId("ArticlesPage")).should("exist")
    })
  })
})
