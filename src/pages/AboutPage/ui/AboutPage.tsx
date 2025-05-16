/* eslint-disable i18next/no-literal-string */
import React, { lazy } from "react"
import { useTranslation } from "react-i18next"

import { Page } from "@/widgets/Page"

import "./AboutPage.module.scss"

const AboutPage: React.FC = () => {
  const { t } = useTranslation("about")
  return (
    <Page data-testid="AboutPage" className="about-page">
      <h1>{t("aboutPageTitle")}</h1>
      <p>
        @use-gesture - позволяет привязывать события мыши и прикосновения к
        любому узлу
        <a>https://use-gesture.netlify.app/</a>
      </p>
      <p>
        @react-spring/web - анимациями
        <a>https://www.react-spring.dev/</a>
      </p>
      <p>
        ts-morph -для изменения ts кода
        <a>https://ts-morph.com/</a>
      </p>
      <p>
        добавлен vite - для сборки
        <a>https://vite.dev/guide/</a>
      </p>
      <p>
        добавлен eslint-plugin-unused-imports - для отслеживания не используемых
        импортов
        <a>https://www.npmjs.com/package/eslint-plugin-unused-imports</a>
      </p>
      <h2>Контекст:</h2>
      <p>Темы</p>
      <p>Анимации</p>
      <h2>Команды:</h2>
      <p>npx ts-node ./scripts/updateImports.ts - запуск файлов ноды</p>
    </Page>
  )
}

export default AboutPage
export const AboutPageAsync = lazy(() => import("./AboutPage"))
