import type { Meta, StoryObj } from "@storybook/react"

import React from "react"
import { BrowserRouter } from "react-router-dom"

import { Sidebar } from "./Sidebar"

const meta: Meta<typeof Sidebar> = {
  title: "widgets/Sidebar",
  component: Sidebar,
  globals: {
    position: "left",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const Primary: Story = {}
