import avatar from "@/shared/assets/tests/avatar.jpg"
import { Country, Currency } from "@/shared/const/enums"

import { ProfileCard } from "./ProfileCard"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "entities/ProfileCard",
  component: ProfileCard,
} satisfies Meta<typeof ProfileCard>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    data: {
      username: "admin",
      age: 22,
      country: Country.Russia,
      lastName: "admin",
      first: "admin",
      city: "Moscow",
      currency: Currency.RUB,
      avatar: avatar,
    },
  },
}

export const ProfilewithError: Story = {
  args: {
    error: "error",
  },
}
