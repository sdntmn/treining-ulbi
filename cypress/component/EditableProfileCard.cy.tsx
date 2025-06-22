import { TestProvider } from "@/shared/lib/tests/ComponentRender/ComponentRender"

import { EditableProfileCard } from "@/features/EditableProfileCard"

const USER_ID = "1"
describe("EditableProfileCard.cy.tsx", () => {
  it("playground", () => {
    // cy.viewport(1920, 1080)
    // cy.intercept("GET", "**/profile/*", { fixture: "profile.json" })
    cy.intercept("GET", "**/profile/*", { fixture: "profile.json" })
    // cy.visit("/profile/1")
    // cy.wait("@loadProfile")
    cy.mount(
      <TestProvider
        options={{
          initialState: {
            user: {
              authData: {
                id: USER_ID,
              },
            },
          },
        }}
      >
        <EditableProfileCard id="1" />
      </TestProvider>
    )
  })
})
