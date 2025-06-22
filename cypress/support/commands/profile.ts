/* eslint-disable @typescript-eslint/no-namespace */
export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId("EditableProfileCardHeader.EditButton").click()

  // Сначала полностью обработать LastName
  cy.getByTestId("ProfileCard.LastName")
    .should("be.visible")
    .clear({ force: true })
    .type(lastname, { delay: 50 })
    .should("have.value", lastname)

  // Затем обработать FirstName
  cy.getByTestId("ProfileCard.FirstName")
    .should("be.visible")
    .clear({ force: true })
    .type(firstname, { delay: 50 })
    .should("have.value", firstname)

  cy.getByTestId("EditableProfileCardHeader.SaveButton").click()
  cy.getByTestId("EditableProfileCardHeader.EditButton").should("exist")
}

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: "PUT",
    url: `http://localhost:8080/profile/${profileId}`,
    headers: { Authorization: "qwerty" },
    body: {
      id: "4",
      first: "test",
      lastName: "user",
      age: 36,
      currency: "EUR",
      country: "Russia",
      city: "Tyumen",
      username: "testuser",
      avatar: "https://cdn-edge.kwork.ru/files/portfolio/t3/82/cover-10168961-1688001496.jpg",
    },
  })
}

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>
      resetProfile(profileId: string): Chainable<void>
    }
  }
}
