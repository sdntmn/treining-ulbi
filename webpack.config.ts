import path from "path"
import webpack from "webpack"

import { buildWebpackConfig } from "./config/build/buildWebpackConfig"
import { BuildEnv, BuildPatchs } from "./config/build/types/config"

export default (env: BuildEnv) => {
  const paths: BuildPatchs = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "build"),
    public: path.resolve(__dirname, "public"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
  }

  const mode = env.mode || "development"
  const PORT: number = env.port || 3000
  const apiUrl = env.apiUrl || "http://localhost:8080"

  const isDev = mode === "development"

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    apiUrl,
    project: "frontend",
  })
  return config
}
