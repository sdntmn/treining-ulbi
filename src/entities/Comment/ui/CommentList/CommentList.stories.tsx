import { CommentList } from "./CommentList"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof CommentList> = {
  title: "entities/CommentList",
  component: CommentList,
} satisfies Meta<typeof CommentList>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
