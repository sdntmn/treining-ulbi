import type { Meta, StoryObj } from "@storybook/react"

import AvatarImg from "../../assets/avatar.jpg"
import { Avatar } from "./Avatar"

const meta = {
  title: "shared/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    size: 50,
    src: AvatarImg,
  },
}
