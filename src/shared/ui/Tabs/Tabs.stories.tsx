import { fn } from "@storybook/test"

import { TabItem, Tabs } from "./Tabs"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "shared/Tabs",
  component: Tabs,
  args: {
    onTabClick: fn(), // Используем fn() для мокирования действий
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

const tabs: TabItem[] = [
  {
    value: "tab 1",
    content: "tab 1",
  },
  {
    value: "tab 2",
    content: "tab 2",
  },
  {
    value: "tab 3",
    content: "tab 3",
  },
]

export const Primary: Story = {
  args: {
    value: "tab 2",
    tabs: tabs,
    onTabClick: fn(),
  },
}
