import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/en.json";
import ru from "./locales/ru/ru.json";
import kz from "./locales/kz/kz.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: en
      },
      ru: {
        translation: ru
      },
      kz: {
        translation: kz
      }
    }
  });

export default i18n;
