/* eslint-disable i18next/no-literal-string */
import React from "react"
import { useTranslation } from "react-i18next"

import { Page } from "@/widgets/Page"

import "./MainPage.module.scss"

const MainPage: React.FC = () => {
  const { t } = useTranslation("main")
  return (
    <Page data-testid="MainPage" className="main-page">
      <h1>{t("mainPageTitle")}</h1>
      <p>Имя: admin</p>
      <p>Пароль: 123</p>
    </Page>
  )
}

export default MainPage
