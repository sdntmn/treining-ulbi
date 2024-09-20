import type { Config } from "jest"

import path from "path"

const config: Config = {
  clearMocks: true,
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>/src"],
  rootDir: "../../",
  testMatch: ["<rootDir>src/**/*.(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.tsx?$": ["babel-jest", { presets: ["@babel/preset-react"] }],
    "^.+\\.scss$": "jest-scss-transform",
  },
  setupFilesAfterEnv: ["<rootDir>config/jest/setup-jest.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
    "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
    "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
  ],
  moduleNameMapper: {
    "\\.(s?css)$": "identity-obj-proxy",
    "\\.(svg)$": path.resolve(__dirname, "jestEmptyComponent.tsx"),
  },
}
export default config
