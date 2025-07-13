/* eslint-disable @typescript-eslint/no-unused-vars */
describe("Пользователь заходит на страницу со списком статей", () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit("articles")
    })
  })
  it("статьи успешно подгружаются", () => {
    cy.getByTestId("ArticleList").should("exist")
    cy.getByTestId("ArticleListItem").should("have.length.gte", 3)
  })
  it("На стабах (фикступах)", () => {
    cy.intercept("GET", "**/articles?*", { fixture: "articles.json" })
    cy.getByTestId("ArticleList").should("exist")
    cy.getByTestId("ArticleListItem").should("have.length.gte", 3)
  })
  it.skip("Пример заскипанного теста", () => {
    cy.getByTestId("ArticleList").should("exist")
    cy.getByTestId("ArticleListItem").should("have.length.gte", 3)
    cy.get("NotArticleListItem").should("exist")
  })
})
