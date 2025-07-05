import { buildBabelLoader } from "./loaders/buildBabelLoader"
import { buildCssLoader } from "./loaders/buildCssLoader"
import { type BuildOptions } from "./types/config"

import type webpack from "webpack"

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  }

  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
  const tsxBabelLoader = buildBabelLoader({ ...options, isTsx: true })

  const cssLoader = buildCssLoader(options.isDev)

  // const typescriptLoader = {
  //   test: /\.tsx?$/,
  //   use: "ts-loader",
  //   exclude: /node_modules/,
  // }

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  }

  return [fileLoader, svgLoader, codeBabelLoader, tsxBabelLoader, cssLoader]
}
