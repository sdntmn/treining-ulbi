import type { Meta, StoryObj } from "@storybook/react"

import avatar from "@/shared/assets/tests/avatar.jpg"
import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"
import { Country, Currency } from "@/shared/const/enums"

import { Page } from "./Page"

const meta = {
  title: "widgets/Page",
  component: Page,
} satisfies Meta<typeof Page>

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
  args: {
    children: "Page",
  },
  decorators: [StoreDecorator(initialState), RouterDecorator()],
}
