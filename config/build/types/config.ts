export type BuildMode = "production" | "development";
export interface BuildPatchs {
  entry: string;
  build: string;
  html: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPatchs;
  isDev: boolean;
  port: number;
}
