/// <reference types="@cypress/react" />
/// <reference types="cypress" />
import React from "react"

import { TestProvider } from "@/shared/lib/tests/ComponentRender/ComponentRender"

import { EditableProfileCard } from "@/features/EditableProfileCard"

const USER_ID = "4"
describe("EditableProfileCard.cy.tsx", () => {
  it("playground", () => {
    cy.intercept("GET", "**/profile/*", { fixture: "profile.json" })
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
        <EditableProfileCard id="4" />
      </TestProvider>
    )
  })
})
