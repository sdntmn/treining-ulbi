import React from "react"
import { useTranslation } from "react-i18next"

import "./MainPage.module.scss"

const MainPage: React.FC = () => {
  const { t } = useTranslation("main")
  return (
    <section className="main-page">
      <h1>{t("mainPageTitle")}</h1>
    </section>
  )
}

export default MainPage
