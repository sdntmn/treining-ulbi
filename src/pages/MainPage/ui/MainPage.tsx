import React from "react"
import { useTranslation } from "react-i18next"
import { Page } from "widgets/Page"

import "./MainPage.module.scss"

const MainPage: React.FC = () => {
  const { t } = useTranslation("main")
  return (
    <Page className="main-page">
      <h1>{t("mainPageTitle")}</h1>
    </Page>
  )
}

export default MainPage
