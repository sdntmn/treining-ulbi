import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    ns: [
      "about",
      "admin",
      "article",
      "comments",
      "common",
      "errors",
      "formAuth",
      "main",
      "notPage",
      "profile",
      "sideBar",
    ],
    defaultNS: "common",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  })

export default i18n
