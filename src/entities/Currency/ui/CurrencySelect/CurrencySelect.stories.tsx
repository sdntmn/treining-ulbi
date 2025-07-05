import { Currency } from "@/shared/const/enums"

import { CurrencySelect } from "./CurrencySelect"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "entities/CurrencySelect",
  component: CurrencySelect,
} satisfies Meta<typeof CurrencySelect>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    value: Currency.RUB,
  },
}
