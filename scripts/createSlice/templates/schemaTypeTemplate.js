/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const firstCharUpperCase = require("../firstCharUpperCase")

module.exports = (
  sliceName
) => `export interface ${firstCharUpperCase(sliceName)}Schema {

}`
