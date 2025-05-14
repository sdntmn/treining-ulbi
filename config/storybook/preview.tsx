import { Preview } from "@storybook/react"
import { initialize, mswLoader } from "msw-storybook-addon"
import * as React from "react"
import { I18nextProvider } from "react-i18next"

import i18n from "../../src/shared/config/i18n/i18n"

import { ThemeProvider } from "./../../src/app/providers/ThemeProvider/ui/ThemeProvider"

import "app/styles/index.scss"

initialize()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["default", "dark", "custom"],
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
  loaders: [mswLoader],

  decorators: [
    (Story, context) => {
      const { locale, theme, position = "center" } = context.globals
      const element = document.getElementById("storybook-root")
      if (element) {
        element.style.background = theme === "dark" ? "#fcfcfc" : "#F4F7FB"
      }
      const centerPosition = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }

      React.useEffect(() => {
        i18n.changeLanguage(locale)
      }, [locale])

      return (
        <ThemeProvider initialTheme={theme}>
          <React.Suspense fallback={<div>loading translations...</div>}>
            <I18nextProvider i18n={i18n}>
              <div
                style={{
                  ...(position === "center" ? centerPosition : {}),
                  width: "100%",
                }}
                className={`app ${
                  theme === "dark"
                    ? "app-dark-theme"
                    : theme === "custom"
                      ? "app-custom-theme"
                      : ""
                }`}
              >
                <Story />
              </div>
            </I18nextProvider>
          </React.Suspense>
        </ThemeProvider>
      )
    },
  ],
}

export default preview
