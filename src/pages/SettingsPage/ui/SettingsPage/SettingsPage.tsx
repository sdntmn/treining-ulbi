import { memo } from "react"
import { useTranslation } from "react-i18next"

import { VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

import { UiDesignSwitcher } from "@/features/UiDesignSwitcher"

import { Page } from "@/widgets/Page"

interface SettingsPageProps {
  className?: string
}

const SettingsPage = memo((props: SettingsPageProps) => {
  const { className } = props
  const { t } = useTranslation("main")

  return (
    <Page className={className}>
      <VStack gap="16">
        <Text title={t("settingsPage")} />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  )
})

export default SettingsPage
SettingsPage.displayName = "SettingsPage"
