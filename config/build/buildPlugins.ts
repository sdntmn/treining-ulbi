import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import CircularDependencyPlugin from "circular-dependency-plugin"
import CopyPlugin from "copy-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import webpack from "webpack"

import { type BuildOptions } from "./types/config"

export function buildPlugins({
  paths,
  isDev,
  apiUrl,
  project,
}: BuildOptions & { analyze?: boolean }): webpack.WebpackPluginInstance[] {
  let minify
  if (!isDev) {
    minify = {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
    }
  } else {
    minify = false
  }

  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      minify: minify,
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project),
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
      async: true,
      formatter: "codeframe",
    }),
  ]

  // Плагины только для development
  if (isDev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin()
      // new BundleAnalyzerPlugin({
      //   openAnalyzer: false,
      // })
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
            name(module: webpack.Module) {
              const packageName = module?.context?.match(
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
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[name].chunk.css",
        ignoreOrder: true,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: paths.locales,
            to: paths.buildLocales,
            noErrorOnMissing: true, // Игнорировать если локалей нет
          },
        ],
      })
    )
  }

  return plugins
}
