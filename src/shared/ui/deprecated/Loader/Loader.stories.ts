import { Loader } from "./Loader"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Loader> = {
  title: "shared/Loader",
  component: Loader,
} satisfies Meta<typeof Loader>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
