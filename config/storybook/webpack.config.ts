import path from "path"
import webpack, { RuleSetRule, DefinePlugin } from "webpack"

import { buildCssLoader } from "../build/loaders/buildCssLoader"
import { BuildPatchs } from "../build/types/config"

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPatchs = {
    build: "",
    html: "",
    entry: "",
    src: path.resolve(__dirname, "..", "..", "src"),
    public: "",
  }
  config.resolve?.modules?.unshift(paths.src)
  config.resolve?.extensions?.push(".ts", ".tsx")

  let rules = config.module?.rules

  if (rules) {
    rules = rules
      .filter(
        (rule): rule is RuleSetRule =>
          rule !== null && rule !== undefined && typeof rule === "object"
      )
      .map((rule: RuleSetRule) => {
        if (
          rule.test instanceof RegExp &&
          rule.test.toString().includes("svg")
        ) {
          return { ...rule, exclude: /\.svg$/i }
        }

        return rule
      })
    if (config.module && config.module.rules) {
      config.module.rules = rules
    }
  }

  rules?.push({
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  })

  config.module?.rules?.push(buildCssLoader(true))

  config?.plugins?.push(
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __API__: JSON.stringify(""),
      __PROJECT__: JSON.stringify("storybook"),
    })
  )

  return config
}
