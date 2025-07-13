import { UiDesignSwitcher } from "./UiDesignSwitcher"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "features/UiDesignSwitcher",
  component: UiDesignSwitcher,
} satisfies Meta<typeof UiDesignSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
