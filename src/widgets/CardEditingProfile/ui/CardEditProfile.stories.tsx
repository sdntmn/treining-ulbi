import { BrowserRouter } from "react-router-dom"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { CardEditingProfile } from "./CardEditingProfile"
import { Country } from "entities/Country"
import { Currency } from "entities/Currency"
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator"
import avatar from "shared/assets/tests/avatar.jpg"

export default {
  title: "widgets/CardEditingProfile",
  component: CardEditingProfile,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as ComponentMeta<typeof CardEditingProfile>

const Template: ComponentStory<typeof CardEditingProfile> = (args) => (
  <CardEditingProfile {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
  StoreDecorator({
    profile: {
      form: {
        first: "Денис",
        lastName: "Сорокин",
        age: 46,
        currency: Currency.RUB,
        country: Country.Russia,
        city: "Tyumen",
        username: "admin",
        avatar: avatar,
      },
    },
  }),
]
