/* eslint-disable i18next/no-literal-string */
import React, { lazy } from "react"
import { useTranslation } from "react-i18next"
import { Page } from "widgets/Page"

import "./AboutPage.module.scss"

const AboutPage: React.FC = () => {
  const { t } = useTranslation("about")
  return (
    <Page className="about-page">
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
      <h2>Контекст:</h2>
      <p>Темы</p>
      <p>Анимации</p>
    </Page>
  )
}

export default AboutPage
export const AboutPageAsync = lazy(() => import("./AboutPage"))
