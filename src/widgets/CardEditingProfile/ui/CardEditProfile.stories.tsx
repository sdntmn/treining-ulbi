import { Meta, StoryObj } from "@storybook/react/*"
import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator"
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator"

import { CardEditingProfile } from "./CardEditingProfile"

const meta = {
  title: "widgets/CardEditingProfile",
  component: CardEditingProfile,
} satisfies Meta<typeof CardEditingProfile>

export default meta

type Story = StoryObj<typeof meta>

const initialState = {
  loginForm: {
    username: "admin",
    password: "123",
    isLoading: false,
  },
}

export const Primary: Story = {
  args: {},
  decorators: [StoreDecorator(initialState), RouterDecorator()],
}

// export const PorfilewithError: Story = {
//   args: {
//     error: "error",
//   },
// }
