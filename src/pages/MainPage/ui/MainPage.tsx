/* eslint-disable i18next/no-literal-string */
import React from "react"
import { useTranslation } from "react-i18next"

import { VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

import { Page } from "@/widgets/Page"

import "./MainPage.module.scss"

const MainPage: React.FC = () => {
  const { t } = useTranslation("main")
  return (
    <Page data-testid="MainPage" className="main-page">
      <VStack gap="32">
        <Text title={t("mainPageTitle")}></Text>
        <Text
          text="Персонализация интерфейса для пользователей.
         Хранение флага загрузки нужного дизайна хранится на баке."
        />
        <Text
          text="Система разграничения доступа
         к контенту сайта на основе ролей пользователей."
        />
        <VStack gap="8">
          <Text text="Имя: admin" />
          <Text text="Пароль: 123" />
        </VStack>
        <VStack gap="8">
          <Text text="Имя: user" />
          <Text text="Пароль: 123" />
        </VStack>
      </VStack>
    </Page>
  )
}

export default MainPage
