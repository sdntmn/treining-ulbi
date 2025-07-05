import { RatingCard } from "./RatingCard"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof RatingCard> = {
  title: "entities/RatingCard",
  component: RatingCard,
} satisfies Meta<typeof RatingCard>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
