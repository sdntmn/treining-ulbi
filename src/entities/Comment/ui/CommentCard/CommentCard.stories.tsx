/* eslint-disable paths-import/imports-layers */
/* eslint-disable max-len */

import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator"

import { User } from "@/entities/User"

import { Comment } from "../../model/types/comment"

import { CommentCard } from "./CommentCard"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof CommentCard> = {
  title: "entities/CommentCard",
  component: CommentCard,
  parameters: {
    position: "left",
  },
} satisfies Meta<typeof CommentCard>

export default meta

type Story = StoryObj<typeof meta>

const user: User = {
  id: "1",
  username: "UserName",
  avatar:
    "https://img.lovepik.com/free-png/20211106/lovepik-lady-head-icon-png-image_400345236_wh1200.png",
}

const comment: Comment = {
  id: "1",
  user: user,
  text: "Все ок",
}

export const Primary: Story = {
  args: { comment: comment, isLoading: false },
  decorators: [RouterDecorator()],
}
