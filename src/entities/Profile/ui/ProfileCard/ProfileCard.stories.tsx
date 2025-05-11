import type { Meta, StoryObj } from "@storybook/react"

import { Country } from "@/entities/Country"
import { Currency } from "@/entities/Currency"
import avatar from "@/shared/assets/tests/avatar.jpg"

import { ProfileCard } from "./ProfileCard"

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
