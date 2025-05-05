/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path")

module.exports = (...segments) =>
  path.resolve(__dirname, "..", "..", ...segments)
