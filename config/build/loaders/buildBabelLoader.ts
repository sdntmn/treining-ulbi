import babelRemovePropsPlugin from "../babel/babelRemovePropsPlugin"
import { BuildOptions } from "../types/config"

interface BuildBabelLoaderProps extends BuildOptions {
  isTsx?: boolean
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
  const isProd = !isDev
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
        presets: ["@babel/preset-env"],
        // eslint-disable-next-line no-sparse-arrays
        plugins: [
          ["@babel/plugin-transform-typescript", { isTSX: isTsx }],
          ["@babel/plugin-transform-runtime"],
          isTsx && isProd && [babelRemovePropsPlugin, { props: ["data-testid"] }],
          ,
          isDev && require.resolve("react-refresh/babel"),
        ].filter(Boolean),
      },
    },
  }
}
