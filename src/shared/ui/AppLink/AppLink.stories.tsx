import type { Meta, StoryObj } from "@storybook/react"

import React from "react"
import { BrowserRouter } from "react-router-dom"
import { AppLinkColor } from "shared/const/enums"

import { AppLink } from "."

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
    appLinkColor: AppLinkColor.PRIMARY,
  },
}

export const Secondary: Story = {
  args: {
    appLinkColor: AppLinkColor.SECONDARY,
  },
}
