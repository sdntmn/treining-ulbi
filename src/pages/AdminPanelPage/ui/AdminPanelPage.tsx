import React from "react"
import { useTranslation } from "react-i18next"

import { Page } from "@/widgets/Page"

const AdminPanelPage: React.FC = () => {
  const { t } = useTranslation("admin")

  return <Page>{t("adminPanelTitle")}</Page>
}

export default AdminPanelPage
