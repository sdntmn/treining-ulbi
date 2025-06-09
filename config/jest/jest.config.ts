import type { Config } from "jest"

import path from "path"

const config: Config = {
  globals: {
    __IS_DEV__: true,
    __API__: "",
    __PROJECT__: "jest",
  },
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
    "node_modules/(?!axios.*)",
  ],
  moduleNameMapper: {
    "\\.(s?css)$": "identity-obj-proxy",
    "\\.(svg)$": path.resolve(__dirname, "jestEmptyComponent.tsx"),
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@/features/(.*)$": "<rootDir>/src/features/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@/shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@/widgets/(.*)$": "<rootDir>/src/widgets/$1",
    // axios: "axios/dist/node/axios.cjs",
  },
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "<rootDir>/reports/unit/report.html",
        filename: "report.html",
        openReport: true,
        inlineSource: true,
      },
    ],
  ],
}
export default config
