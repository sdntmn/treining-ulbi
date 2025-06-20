/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs/promises")

const firstCharUpperCase = require("../firstCharUpperCase")
const resolveRoot = require("../resolveRoot")
const componentTemplate = require("./componentTemplate")
const storyTemplate = require("./storyTemplate")
const styleTemplate = require("./styleTemplate")

module.exports = async ({ layer, sliceName, normalizeLineEndings }) => {
  const resolveUIPath = (...segments) =>
    resolveRoot("src", layer, sliceName, "ui", ...segments)

  const createUIDir = async () => {
    try {
      await fs.mkdir(resolveUIPath())
    } catch (e) {
      console.log("Не удалось создать UI директорию")
    }
  }

  const createComponent = async () => {
    try {
      const componentName = firstCharUpperCase(sliceName)
      await fs.mkdir(resolveUIPath(componentName))
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.tsx`),
        normalizeLineEndings(componentTemplate(componentName))
      )
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.stories.tsx`),
        normalizeLineEndings(storyTemplate(layer, componentName))
      )
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.module.scss`),
        normalizeLineEndings(styleTemplate(componentName))
      )
    } catch (e) {
      console.log("Не удалось создать компонент")
    }
  }

  await createUIDir()
  await createComponent()
}
