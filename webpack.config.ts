import webpack from "webpack";
import path from "path";

import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildPatchs } from "./config/build/types/config";

export default (env: BuildEnv) => {
  const paths: BuildPatchs = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
  };

  const mode = env.mode || "development";
  const PORT: number = env.port || 3000;

  const isDev = mode === "development";

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
  });
  return config;
};
