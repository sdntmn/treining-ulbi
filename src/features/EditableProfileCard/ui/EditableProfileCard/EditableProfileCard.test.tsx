/* eslint-disable i18next/no-literal-string */
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"

import { $api } from "@/shared/api/api"
import { Currency } from "@/shared/const/enums"
import { ComponentRender } from "@/shared/lib/tests/ComponentRender/ComponentRender"

import { Country } from "@/entities/Country"
import { Profile } from "@/entities/Profile"

import { profileReducer } from "../../model/slice/profileSlice"

import { EditableProfileCard } from "./EditableProfileCard"

const profile: Profile = {
  id: "1",
  first: "admin",
  lastName: "admin",
  age: 46,
  currency: Currency.USD,
  country: Country.Kazakhstan,
  city: "Moscow",
  username: "admin213",
}

const options = {
  initialState: {
    profile: {
      isReadonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: "1", username: "admin" },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
}

afterEach(() => {
  jest.clearAllMocks()
  cleanup()
})

describe("features/EditableProfileCard", () => {
  test("Режим рид онли должен переключиться", async () => {
    ComponentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    )
    expect(
      screen.getByTestId("EditableProfileCardHeader.CancelButton")
    ).toBeInTheDocument()
  })

  test("При отмене значения должны обнуляться", async () => {
    ComponentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    )

    const firstNameInput = screen.getByTestId("ProfileCard.FirstName")
    const lastNameInput = screen.getByTestId("ProfileCard.Lastname")

    await userEvent.clear(firstNameInput)
    await userEvent.clear(lastNameInput)

    await userEvent.type(screen.getByTestId("ProfileCard.FirstName"), "user")
    await userEvent.type(screen.getByTestId("ProfileCard.Lastname"), "user")

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.CancelButton")
    )

    expect(screen.getByTestId("ProfileCard.FirstName")).toHaveValue("admin")
    expect(screen.getByTestId("ProfileCard.Lastname")).toHaveValue("admin")
  })

  test("Должна появиться ошибка", async () => {
    ComponentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    )

    await userEvent.clear(screen.getByTestId("ProfileCard.FirstName"))

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveButton")
    )

    expect(
      screen.getByTestId("EditableProfileCard.Error.text")
    ).toBeInTheDocument()
  })

  test("Если нет ошибок валидации, то на сервер должен уйти PUT запрос", async () => {
    const mockPutReq = jest.spyOn($api, "put")
    ComponentRender(<EditableProfileCard id="1" />, options)
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    )

    await userEvent.type(screen.getByTestId("ProfileCard.FirstName"), "user")

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveButton")
    )

    expect(mockPutReq).toHaveBeenCalled()
  })
})
