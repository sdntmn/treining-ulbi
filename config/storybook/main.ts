import type { StorybookConfig } from "@storybook/react-webpack5"

interface DefaultType {
  presets: [
    [
      "@babel/preset-react",
      {
        runtime: "automatic"
      },
      "preset-react-jsx-transform",
      "@babel/preset-typescript",
      "@babel/preset-env",
      "@babel/preset-flow",
    ],
  ]
}

const config: StorybookConfig = {
  stories: ["../../src/**/*.mdx", "../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/react-webpack5",

    options: {},
  },
  features: {
    backgroundsStoryGlobals: true,
  },
  staticDirs: ["../../public"],
  babel: async (options: DefaultType) => ({
    ...options,
    presets: [
      ...options.presets,
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
        "preset-react-jsx-transform",
      ],
    ],
  }),
}

export default config
