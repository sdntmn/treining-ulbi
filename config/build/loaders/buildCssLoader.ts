import MiniCssExtractPlugin from "mini-css-extract-plugin"

export function buildCssLoader(isDev: boolean) {
  return {
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            localIdentName: "[local]",
            namedExport: false,
          },
        },
      },
      // "postcss-loader",
      "sass-loader",
    ],
  }
}
