/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Meta, StoryObj } from "@storybook/react"

import React from "react"
import { BrowserRouter } from "react-router-dom"

import { AppLink, AppLinkColor } from "./AppLink"

const meta = {
  title: "shared/AppLink",
  component: AppLink,
  args: {
    to: "/",
    children: "Link text",
  },
  tags: ["autodocs"],
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
    appLinkColor: AppLinkColor.Primary,
  },
}

export const Secondary: Story = {
  args: {
    appLinkColor: AppLinkColor.Secondary,
  },
}
