import { Modal } from "./Modal"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Modal> = {
  title: "shared/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    isOpen: true,
    children:
      // eslint-disable-next-line max-len
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla nobis, eligendi repudiandae consectetur recusandae sint? Qui repellendus ullam autem non voluptatum adipisci nostrum quibusdam fuga velit eos? Vitae, omnis dicta!",
  },
}
