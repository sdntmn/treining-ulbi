// import { ComponentStory, ComponentMeta } from "@storybook/react"

// import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator"
// import { Theme } from "1_app/providers/ThemeProvider"
// import { Button, ButtonSize, ButtonVar } from "./Button"

// export default {
//   title: "shared/Button",
//   component: Button,
//   argTypes: {
//     backgroundColor: { control: "color" },
//   },
// } as ComponentMeta<typeof Button>

// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

// export const Clear = Template.bind({})
// Clear.args = {
//   children: "Text",
//   buttonVar: ButtonVar.CLEAR,
// }

// export const ClearInverted = Template.bind({})
// ClearInverted.args = {
//   children: "Text",
//   buttonVar: ButtonVar.CLEAR_INVERTED,
// }

// export const ClearDark = Template.bind({})
// ClearDark.args = {
//   children: "Text",
//   buttonVar: ButtonVar.CLEAR,
// }
// ClearDark.decorators = [ThemeDecorator(Theme.DARK)]

// export const Outline = Template.bind({})
// Outline.args = {
//   children: "Text",
//   buttonVar: ButtonVar.OUTLINE,
// }

// export const OutlineSizeL = Template.bind({})
// OutlineSizeL.args = {
//   children: "Text",
//   buttonVar: ButtonVar.OUTLINE,
//   size: ButtonSize.L,
// }

// export const OutlineSizeXL = Template.bind({})
// OutlineSizeXL.args = {
//   children: "Text",
//   buttonVar: ButtonVar.OUTLINE,
//   size: ButtonSize.XL,
// }

// export const OutlineDark = Template.bind({})
// OutlineDark.args = {
//   children: "Text",
//   buttonVar: ButtonVar.OUTLINE,
// }
// OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]

// export const Background = Template.bind({})
// Background.args = {
//   children: "Text",
//   buttonVar: ButtonVar.BACKGROUND,
// }

// export const BackgroundDark = Template.bind({})
// Background.args = {
//   children: "Text",
//   buttonVar: ButtonVar.BACKGROUND,
// }
// BackgroundDark.decorators = [ThemeDecorator(Theme.DARK)]

// export const SquareSizeL = Template.bind({})
// SquareSizeL.args = {
//   children: ">",
//   buttonVar: ButtonVar.BACKGROUND,
//   square: true,
//   size: ButtonSize.L,
// }
// SquareSizeL.decorators = [ThemeDecorator(Theme.DARK)]

// export const SquareSizeM = Template.bind({})
// SquareSizeM.args = {
//   children: ">",
//   buttonVar: ButtonVar.BACKGROUND,
//   square: true,
//   size: ButtonSize.M,
// }

// export const SquareSizeXL = Template.bind({})
// SquareSizeXL.args = {
//   children: ">",
//   buttonVar: ButtonVar.BACKGROUND,
//   square: true,
//   size: ButtonSize.XL,
// }

// export const SquareSizeXLDark = Template.bind({})
// SquareSizeXLDark.args = {
//   children: ">",
//   buttonVar: ButtonVar.BACKGROUND,
//   square: true,
//   size: ButtonSize.XL,
// }
// SquareSizeXLDark.decorators = [ThemeDecorator(Theme.DARK)]

// export const Disabled = Template.bind({})
// Disabled.args = {
//   children: ">",
//   buttonVar: ButtonVar.BACKGROUND,
//   square: true,
//   disabled: true,
//   size: ButtonSize.XL,
// }
// Disabled.decorators = [ThemeDecorator(Theme.DARK)]
