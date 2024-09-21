import type { Meta, StoryObj } from "@storybook/react"

import React from "react"
import { BrowserRouter } from "react-router-dom"

import { Navbar } from "./Navbar"

const meta = {
  title: "widgets/Navbar",
  component: Navbar,
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
} satisfies Meta<typeof Navbar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
