import type { Meta, StoryObj } from "@storybook/react"

import ProfilePage from "./ProfilePage"

const meta = {
  title: "pages/ProfilePage",
  component: ProfilePage,
} satisfies Meta<typeof ProfilePage>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

// import { ComponentStory, ComponentMeta } from "@storybook/react"
// import { Theme } from "1_app/providers/ThemeProvider"
// import { Country } from "entities/Country"
// import { Currency } from "entities/Currency"
// import avatar from "shared/assets/tests/avatar.jpg"
// import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator"
// import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator"

// import ProfilePage from "./import type { Meta, StoryObj } from "@storybook/react"

// import MainPage from "./MainPage"

// const meta = {
//   title: "pages/MainPage",
//   component: MainPage,
// } satisfies Meta<typeof MainPage>

// export default meta

// type Story = StoryObj<typeof meta>

// export const Primary: Story = {}"

// export default {
//   title: "pages/ProfilePage",
//   component: ProfilePage,
//   argTypes: {
//     backgroundColor: { control: "color" },
//   },
// } as ComponentMeta<typeof ProfilePage>

// const Template: ComponentStory<typeof ProfilePage> = (args) => (
//   <ProfilePage {...args} />
// )

// export const Normal = Template.bind({})
// Normal.args = {}
// Normal.decorators = [
//   StoreDecorator({
//     profile: {
//       form: {
//         first: "Денис",
//         lastName: "Сорокин",
//         age: 46,
//         currency: Currency.RUB,
//         country: Country.Russia,
//         city: "Tyumen",
//         username: "admin",
//         avatar: avatar,
//       },
//     },
//   }),
// ]

// export const Dark = Template.bind({})
// Dark.args = {}
// Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})]
