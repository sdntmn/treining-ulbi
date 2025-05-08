import type webpack from "webpack"

import TerserPlugin from "terser-webpack-plugin"

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
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[name].[contenthash:8].chunk.js",
      path: paths.build,
      clean: true,
      publicPath: "/",
      assetModuleFilename: "assets/[hash][ext][query]",
    },
    cache: {
      type: "filesystem",
      buildDependencies: {
        config: [__filename],
      },
    },
    plugins: buildPlugins(options),
    module: { rules: buildLoaders(options) },
    resolve: buildResolvers(options),
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
    devServer: isDev ? buildDevServer(options) : undefined,
    stats: {
      children: false,
      modules: false,
    },
    optimization: {
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: {
              drop_console: !isDev,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: "all",
        minSize: 30000,
        maxSize: 244 * 1024,
        minChunks: 1,
        maxAsyncRequests: 20,
        maxInitialRequests: 20,
        automaticNameDelimiter: "~",
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            name(module: webpack.Module) {
              const packageName = module.context?.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1]
              return `vendor.${packageName?.replace("@", "") ?? "lib"}`
            },
          },
          common: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: {
        name: (entrypoint: { name: string }) => `runtime-${entrypoint.name}`,
      },
    },
    performance: {
      hints: false, // Отключаем предупреждения о размере бандла
    },
  }
}
