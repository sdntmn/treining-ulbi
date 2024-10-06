import { Preview } from "@storybook/react"
import React, { useEffect, Suspense } from "react"
import { I18nextProvider } from "react-i18next"

import i18n from "../../src/shared/config/i18n/i18n"
import { ThemeProvider } from "./../../src/app/providers/ThemeProvider/ui/ThemeProvider"

import "app/styles/index.scss"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["default", "dark"],
        dynamicTitle: true,
      },
    },
    position: {
      description: "Global position for components",
      toolbar: {
        icon: "circlehollow",
        items: ["center", "left"],
        dynamicTitle: true,
      },
    },
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      toolbar: {
        icon: "globe",
        items: [
          { value: "ru", right: "ru", title: "Русский" },
          { value: "en", right: "🇺🇸", title: "English" },
        ],
        showName: true,
      },
    },
  },
  initialGlobals: {
    theme: "default",
    position: "center",
    locale: "ru",
  },

  decorators: [
    (Story, context) => {
      const { locale, theme, position = "center" } = context.globals
      const element = document.getElementById("storybook-root")
      if (element) {
        element.style.padding = "0"
      }
      const centerPosition = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }

      useEffect(() => {
        i18n.changeLanguage(locale)
      }, [locale])

      return (
        <ThemeProvider initialTheme={theme}>
          <Suspense fallback={<div>loading translations...</div>}>
            <I18nextProvider i18n={i18n}>
              <div
                style={{
                  width: "100vw",
                  ...(position === "center" ? centerPosition : {}),
                }}
                className={`app ${theme === "dark" ? "app-dark-theme" : ""}`}
              >
                <Story />
              </div>
            </I18nextProvider>
          </Suspense>
        </ThemeProvider>
      )
    },
  ],
}

export default preview
