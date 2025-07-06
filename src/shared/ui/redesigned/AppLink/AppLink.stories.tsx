import { BrowserRouter } from "react-router-dom"

import { AppLink } from "."

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "shared/AppLink",
  component: AppLink,
  args: {
    to: "/",
    children: "Link text",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof AppLink>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    appLinkColor: "primary",
  },
}

export const Secondary: Story = {
  args: {
    appLinkColor: "secondary",
  },
}
