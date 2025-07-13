/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from "path"

import { buildCssLoader } from "config/build/loaders/buildCssLoader"
import { DefinePlugin } from "webpack"

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

// @ts-ignore
type CompatibleDefinePlugin = InstanceType<typeof DefinePlugin> & {
  apply: (compiler: any) => void
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
  webpackFinal: async (config) => {
    const paths = {
      src: path.resolve(__dirname, "..", "..", "src"),
    }

    // Настройка resolve
    config.resolve = {
      ...config.resolve,
      modules: [...(config.resolve?.modules || []), paths.src],
      extensions: [...(config.resolve?.extensions || []), ".ts", ".tsx"],
      alias: {
        ...config.resolve?.alias,
        "@": paths.src,
      },
    }

    // Настройка module.rules
    config.module = {
      ...config.module,
      rules: [
        ...(config.module?.rules?.map((rule) => {
          if (typeof rule === "object" && rule?.test instanceof RegExp && rule.test.test(".svg")) {
            return { ...rule, exclude: /\.svg$/i }
          }
          return rule
        }) || []),
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        buildCssLoader(true),
      ],
    }

    const definePlugin = new DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __API__: JSON.stringify("https://testapi.ru"),
      __PROJECT__: JSON.stringify("storybook"),
    }) as CompatibleDefinePlugin

    // Добавляем плагины
    // config.plugins = [
    //   ...(config.plugins || []),
    //   new DefinePlugin({
    //     __IS_DEV__: JSON.stringify(true),
    //     __API__: JSON.stringify("https://testapi.ru"),
    //     __PROJECT__: JSON.stringify("storybook"),
    //   }),
    // ]

    config.plugins?.push(definePlugin)

    return config
  },
}

export default config
