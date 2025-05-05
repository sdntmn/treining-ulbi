/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs/promises")
const os = require("os") // Добавляем модуль для определения ОС

const resolveRoot = require("../resolveRoot")
const createModel = require("./createModel")
const createPublicApi = require("./createPublicApi")
const createUI = require("./createUI")

// Функция для нормализации концов строк
const normalizeLineEndings = (content) => {
  // Для Windows заменяем LF на CRLF, для других ОС оставляем как есть
  return process.platform === "win32" ? content.replace(/\n/g, "\r\n") : content
}

module.exports = async (layer, sliceName) => {
  try {
    await fs.mkdir(resolveRoot("src", layer, sliceName))
  } catch (e) {
    console.log(`не удалось создать директорию для слайса${sliceName}`)
  }

  // Передаем функцию нормализации в создаваемые модули
  const createOptions = {
    layer,
    sliceName,
    normalizeLineEndings,
  }

  await createModel(createOptions)
  await createUI(createOptions)
  await createPublicApi(createOptions)
}
