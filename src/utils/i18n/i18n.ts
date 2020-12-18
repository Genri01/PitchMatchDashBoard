import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import RU from "../../assets/locales/ru.json";
import EN from "../../assets/locales/en.json";

const resources = {
  en: { translation: EN },
  ru: { translation: RU },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    keySeparator: ".",
    detection: {
      myDetectorsName: "pitch-match-lang",
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: "language",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
