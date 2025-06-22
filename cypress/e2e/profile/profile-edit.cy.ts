/**
 * Тестовый сценарий для проверки профиля пользователя.
 * @remarks
 * Этот тестовый сценарий проверяет успешную загрузку профиля и возможность его редактирования.
 */
let userId: string = ""

describe("Пользователь заходит на страницу профиля", () => {
  /**
   * Перед каждым тестом выполняется вход в систему и переход к профилю пользователя.
   */
  beforeEach(() => {
    cy.visit("")
    cy.login().then((data) => {
      userId = data.id
      cy.visit("profile/" + data.id)
    })
  })

  /**
   * После каждого теста сбрасывается профиль пользователя.
   */
  afterEach(() => {
    cy.resetProfile(userId)
  })

  /**
   * Тестовый случай для проверки успешной загрузки профиля.
   * @remarks
   * Этот тестовый случай проверяет, что профиль пользователя успешно загружен и содержит ожидаемые значения.
   */
  it("Профиль успешно загружен", () => {
    cy.getByTestId("ProfileCard.FirstName").should("have.value", "test")
  })

  /**
   * Тестовый случай для проверки редактирования профиля.
   * @remarks
   * Этот тестовый случай проверяет, что профиль пользователя может быть успешно отредактирован и сохранен.
   */
  it("Редактирует профиль", () => {
    const newName = "new"
    const newLastname = "newlastname"
    cy.updateProfile(newName, newLastname)
    cy.reload()
    cy.getByTestId("ProfileCard.FirstName").should("have.value", newName)
    cy.getByTestId("ProfileCard.LastName").should("have.value", newLastname)
  })
})
