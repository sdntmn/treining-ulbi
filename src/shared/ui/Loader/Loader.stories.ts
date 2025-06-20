import type { Meta, StoryObj } from "@storybook/react"

import { Loader } from "./Loader"

const meta: Meta<typeof Loader> = {
  title: "shared/Loader",
  component: Loader,
} satisfies Meta<typeof Loader>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
