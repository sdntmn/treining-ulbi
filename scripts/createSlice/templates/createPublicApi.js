/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs/promises")

const firstCharUpperCase = require("../firstCharUpperCase")
const resolveRoot = require("../resolveRoot")

module.exports = async ({ layer, sliceName, normalizeLineEndings }) => {
  const componentName = firstCharUpperCase(sliceName)
  const schemaName = `${sliceName}Schema`

  try {
    const content = normalizeLineEndings(
      `export { ${componentName} } from "./ui/${componentName}/${componentName}";

export { ${firstCharUpperCase(schemaName)} } from "./model/types/${schemaName}";`
    )

    await fs.writeFile(
      resolveRoot("src", layer, sliceName, "index.ts"),
      content
    )
  } catch (e) {
    console.log("Не удалось создать PUBLIC API", e)
  }
}
