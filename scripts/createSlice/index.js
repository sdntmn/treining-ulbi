/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const createTemplate = require("./templates/createTemplate")
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
})

const layers = ["features", "entities", "pages"]

async function run() {
  let layer = process.argv[2]
  let sliceName = process.argv[3]

  if (!layer || !layers.includes(layer)) {
    layer = await askQuestion(`Укажите слой (${layers.join(", ")}): `)

    while (!layers.includes(layer)) {
      console.log(`Ошибка: допустимые слои - ${layers.join(", ")}`)
      layer = await askQuestion(`Укажите слой (${layers.join(", ")}): `)
    }
  }

  if (!sliceName) {
    sliceName = await askQuestion("Укажите название слайса: ")

    while (!sliceName.trim()) {
      console.log("Ошибка: название не может быть пустым")
      sliceName = await askQuestion("Укажите название слайса: ")
    }
  }

  createTemplate(layer, sliceName)
  readline.close()
}

function askQuestion(question) {
  return new Promise((resolve) => {
    readline.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

run().catch((err) => {
  console.error("Ошибка:", err)
  readline.close()
})
