/* eslint-disable i18next/no-literal-string */
import React, { lazy } from "react"
import { useTranslation } from "react-i18next"

import { AppLink } from "@/shared/ui/redesigned/AppLink"
import { VStack } from "@/shared/ui/redesigned/Stack"
import { Text } from "@/shared/ui/redesigned/Text"

import { Page } from "@/widgets/Page"

import "./AboutPage.module.scss"

const AboutPage: React.FC = () => {
  const { t } = useTranslation("about")
  return (
    <Page data-testid="AboutPage" className="about-page">
      <VStack gap="32">
        <Text size="l" title={t("aboutPageTitle")} />
        <VStack gap="8">
          <Text text="Проект написан в соответствии с методологией Feature sliced design" />
          <Text>
            <AppLink
              appLinkColor="secondary"
              to={"https://feature-sliced.github.io/documentation/ru/docs"}
            >
              Ссылка на документацию - feature sliced design
            </AppLink>
          </Text>
        </VStack>
        <VStack gap="8">
          <Text size="m" title="Контексты"></Text>
          <Text>Темы</Text>
          <Text>Анимации</Text>
        </VStack>
        <VStack gap="8">
          <Text size="m" title="Тестирование"></Text>
          <Text>
            Обычные unit тесты на jest -{" "}
            <AppLink
              appLinkColor="secondary"
              to={"https://sdntmn.github.io/treining-ulbi/unit/report.html"}
            >
              Ссылка на отчет по тестам
            </AppLink>
          </Text>
          <Text>Скриншотное тестирование</Text>
          <Text>E2e тестирование с Cypress</Text>
        </VStack>
      </VStack>
    </Page>
  )
}

export default AboutPage
export const AboutPageAsync = lazy(() => import("./AboutPage"))
