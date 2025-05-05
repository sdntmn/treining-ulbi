import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import webpack from "webpack"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

import { type BuildOptions } from "./types/config"

export function buildPlugins({
  paths,
  isDev,
  apiUrl,
  project,
  analyze,
}: BuildOptions & { analyze?: boolean }): webpack.WebpackPluginInstance[] {
  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      minify: !isDev
        ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
        }
        : false,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].chunk.css",
      ignoreOrder: true,
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: paths.locales,
          to: paths.buildLocales,
          noErrorOnMissing: true, // Игнорировать если локалей нет
        },
      ],
    }),
  ]

  // Плагины только для development
  if (isDev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerPort: 8899,
        analyzerMode: "disabled", // Можно включить через env переменную
      })
    )
  }

  // Плагины только для production
  if (!isDev) {
    plugins.push(
      new webpack.optimize.SplitChunksPlugin({
        chunks: "all",
        minSize: 20000,
        maxSize: 244 * 1024, // 244KB
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            name(module: { context: string }) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1]
              return `vendor.${packageName?.replace("@", "") ?? "lib"}`
            },
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      })
    )

    // Анализатор только при явном указании
    if (analyze) {
      plugins.push(
        new BundleAnalyzerPlugin({
          openAnalyzer: true,
          analyzerPort: 8888,
          defaultSizes: "parsed",
        })
      )
    }
  }

  return plugins
}
