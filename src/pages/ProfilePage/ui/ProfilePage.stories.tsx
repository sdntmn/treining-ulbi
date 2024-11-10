import type { Meta, StoryObj } from "@storybook/react"

import { Country } from "entities/Country"
import { Currency } from "entities/Currency"
import avatar from "shared/assets/tests/avatar.jpg"
import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator"

import ProfilePage from "./ProfilePage"

const meta = {
  title: "pages/ProfilePage",
  component: ProfilePage,
} satisfies Meta<typeof ProfilePage>

export default meta

type Story = StoryObj<typeof meta>

const initialState = {
  profile: {
    form: {
      first: "Денис",
      lastName: "Сорокин",
      age: 46,
      currency: Currency.RUB,
      country: Country.Russia,
      city: "Tyumen",
      username: "admin",
      avatar: avatar,
    },
  },
}

export const Primary: Story = {
  args: {},
  decorators: [StoreDecorator(initialState), RouterDecorator()],
}
