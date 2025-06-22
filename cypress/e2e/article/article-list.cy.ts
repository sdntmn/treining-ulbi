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
})
