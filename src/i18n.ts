import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "uz",
    debug: false,
    detection: {
      order: ["localStorage", "sessionStorage", "queryString", "cookie"],
      caches: ["localStorage", "sessionStorage", "queryString", "cookie"],
      lookupCookie: "lang",
      lookupLocalStorage: "lang",
      lookupQuerystring: "lang",
      lookupSessionStorage: "lang",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
