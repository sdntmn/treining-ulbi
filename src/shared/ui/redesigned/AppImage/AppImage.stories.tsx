import AvatarImg from "../../../assets/tests/avatar.jpg"

import { AppImage } from "./AppImage"

import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "shared/AppImage",
  component: AppImage,
} satisfies Meta<typeof AppImage>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    fallback: AvatarImg,
  },
}
