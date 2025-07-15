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
          <Text size="m" title="Проект содержит 2 конфига"></Text>
          <Text>Webpack - ./config/build</Text>
          <Text>Vite - vite.config.ts</Text>
          <Text>Оба сборщика адаптированы под основные фичи приложения.</Text>
          <Text>Вся конфигурация хранится в /config</Text>
          <ul>
            <li>- /config/babel - babel</li>
            <li>- /config/build - конфигурация webpack</li>
            <li>- /config/jest - конфигурация тестовой среды</li>
            <li>- /config/storybook - конфигурация сторибука</li>
          </ul>
        </VStack>
        <VStack gap="8">
          <Text size="m" title="Scripts"></Text>
          <Text>Скрипт для создания компонента -createSlice</Text>
          <Text>Удаление фичей по флагу и состоянию (on или off) - remove-feature</Text>
          <Text>Рефакторинг кода - createPublickApiForSharedUi</Text>
          <Text></Text>
        </VStack>
        <VStack gap="8">
          <Text size="m" title="Работа с данными"></Text>
          <Text>Взаимодействие с данными осуществляется с помощью redux toolkit.</Text>
          <Text>
            Запросы на сервер отправляются с помощью RTK query (/src/shared/api/rtkApi.ts)
          </Text>
          <Text>
            Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
            DynamicModuleLoader
            (/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)
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
        <VStack gap="8">
          <Text size="m" title="Линтинг"></Text>
          <Text>
            В проекте используется eslint для проверки typescript кода и stylelint для проверки
            файлов со стилями. Prettier для формирования кода.
          </Text>
          <Text>
            Также для строгого контроля главных архитектурных принципов используется собственный
            eslint plugin, который содержит 3 правила
          </Text>
          <ul>
            <li>path-checker - запрещает использовать абсолютные импорты в рамках одного модуля</li>
            <li>
              imports-layer - проверяет корректность использования слоев с точки зрения FSD
              (например widgets нельзя использовать в features и entitites)
            </li>
            <li>
              imports-public-api - разрешает импорт из других модулей только из public api. Имеет
              auto fix
            </li>
          </ul>
        </VStack>
        <VStack gap="8">
          <Text size="m" title="Storybook"></Text>
          <Text>В проекте для каждого компонента описываются стори-кейсы.</Text>
          <Text>Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx</Text>
        </VStack>
        <VStack gap="8">
          <Text size="m" title="CI pipeline"></Text>
          <Text>Конфигурация github actions находится в /.github/workflows..</Text>
          <Text>В ci прогоняются все виды тестов, сборка проекта, линтинг.</Text>
        </VStack>
      </VStack>
    </Page>
  )
}

export default AboutPage
export const AboutPageAsync = lazy(() => import("./AboutPage"))
