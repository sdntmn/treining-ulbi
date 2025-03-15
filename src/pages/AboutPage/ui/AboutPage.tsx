import React from "react"
import { useTranslation } from "react-i18next"

import "./AboutPage.module.scss"

const AboutPage: React.FC = () => {
  const { t } = useTranslation("about")
  return (
    <section className="about-page">
      <h1>{t("aboutPageTitle")}</h1>
    </section>
  )
}

export default AboutPage
