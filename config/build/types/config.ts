export type BuildMode = "production" | "development";
export interface BuildPatchs {
  public: string;
  entry: string;
  build: string;
  html: string;
  src: string;
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
