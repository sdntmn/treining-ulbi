import React from "react"
import { useTranslation } from "react-i18next"
import { Page } from "widgets/Page"

import "./AboutPage.module.scss"

const AboutPage: React.FC = () => {
  const { t } = useTranslation("about")
  return (
    <Page className="about-page">
      <h1>{t("aboutPageTitle")}</h1>
    </Page>
  )
}

export default AboutPage
