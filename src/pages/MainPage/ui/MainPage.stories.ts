import avatar from "@/shared/assets/tests/avatar.jpg"
import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"
import { Country, Currency } from "@/shared/const/enums"

import MainPage from "./MainPage"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "pages/MainPage",
  component: MainPage,
} satisfies Meta<typeof MainPage>

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
