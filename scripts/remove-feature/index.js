/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

import { createInterface } from "readline"

import { Project, SyntaxKind } from "ts-morph"

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const toggleFunctionName = "toggleFeatures"
const toggleComponentName = "ToggleFeaturesComponent"

let removedFeatureName
let featureState

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

function isToggleFunction(node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier)
  return identifier?.getText() === toggleFunctionName
}

function isToggleComponent(node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier)
  return identifier?.getText() === toggleComponentName
}

function replaceToggleFunction(node) {
  const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression)
  if (!objectOptions) return

  const offFunctionProperty = objectOptions.getProperty("off")
  const onFunctionProperty = objectOptions.getProperty("on")
  const featureNameProperty = objectOptions.getProperty("name")

  const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
  const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
  const featureName = featureNameProperty
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getLiteralValue()

  if (featureName !== removedFeatureName) return

  if (featureState === "on") {
    node.replaceWithText(onFunction?.getBodyText() ?? "")
  } else if (featureState === "off") {
    node.replaceWithText(offFunction?.getBodyText() ?? "")
  }
}

function getAttributeNodeByName(jsxAttributes, name) {
  return jsxAttributes.find((node) => {
    const nameNode = node.getNameNode()
    return nameNode.getText() === name
  })
}

function getReplacedComponent(attribute) {
  if (!attribute) return undefined
  const value = attribute.getInitializer()
  const component = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText()

  if (component?.startsWith("(")) {
    return component.slice(1, -1)
  }

  if (value?.isKind(SyntaxKind.JsxExpression)) {
    return value.getExpression()?.getText()
  }
  return value?.getText()
}

function replaceComponent(node) {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute)

  const onAttribute = getAttributeNodeByName(attributes, "on")
  const offAttribute = getAttributeNodeByName(attributes, "off")
  const featureNameAttribute = getAttributeNodeByName(attributes, "feature")

  const featureName = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getLiteralValue()

  if (featureName !== removedFeatureName) return

  const offValue = getReplacedComponent(offAttribute)
  const onValue = getReplacedComponent(onAttribute)

  if (featureState === "on" && onValue) {
    node.replaceWithText(onValue)
  } else if (featureState === "off" && offValue) {
    node.replaceWithText(offValue)
  }
}

async function main() {
  try {
    removedFeatureName = await askQuestion("Укажите название фича-флага: ")
    if (!removedFeatureName) {
      throw new Error("Укажите название фича-флага")
    }

    featureState = await askQuestion("Укажите состояние фичи (on или off): ")
    featureState = featureState.toLowerCase()

    while (featureState !== "on" && featureState !== "off") {
      console.log("Некорректное значение состояния фичи (допустимо только on или off)")
      featureState = await askQuestion("Укажите состояние фичи (on или off): ")
      featureState = featureState.toLowerCase()
    }

    const project = new Project({
      tsConfigFilePath: "tsconfig.json",
    })

    project.addSourceFilesAtPaths("src/**/*.ts")
    project.addSourceFilesAtPaths("src/**/*.tsx")

    const files = project.getSourceFiles()

    files.forEach((sourceFile) => {
      sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
          replaceToggleFunction(node)
        }
        if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
          replaceComponent(node)
        }
      })
    })

    await project.save()
    console.log(`Флаг ${removedFeatureName}
       успешно ${featureState === "on" ? "включен" : "выключен"}`)
  } catch (error) {
    console.error("Ошибка:", error instanceof Error ? error.message : String(error))
    process.exit(1)
  } finally {
    rl.close()
  }
}

main()
