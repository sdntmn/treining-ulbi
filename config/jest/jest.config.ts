import type { Config } from "jest"

const config: Config = {
  clearMocks: true,
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  rootDir: "../../",
  testMatch: ["<rootDir>src/**/*.(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
}
export default config
