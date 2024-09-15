import type webpack from "webpack"

import { buildDevServer } from "./buildDevServer"
import { buildLoaders } from "./buildLoaders"
import { buildPlugins } from "./buildPlugins"
import { buildResolvers } from "./buildResolvers"
import { type BuildOptions } from "./types/config"

export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { isDev, mode, paths } = options

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: { rules: buildLoaders(options) },
    resolve: buildResolvers(options),
    devtool: isDev ? "inline-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 5,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  }
}
