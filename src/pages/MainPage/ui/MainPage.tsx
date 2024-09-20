import { BugButton } from "app/providers/ErrorBoundary"
import React from "react"
import { useTranslation } from "react-i18next"

const MainPage = () => {
  const { t } = useTranslation("main")
  return (
    <div>
      <h1>{t("mainPageTitle")}</h1>
      <BugButton />
    </div>
  )
}

export default MainPage
