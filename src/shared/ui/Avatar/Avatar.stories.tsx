import type { Meta, StoryObj } from "@storybook/react"

import { Avatar } from "./Avatar"
import AvatarImg from "../../assets/tests/avatar.jpg"

const meta = {
  title: "shared/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    size: 50,
    alt: "аватар",
    src: AvatarImg,
  },
}
