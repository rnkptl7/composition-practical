import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import ge from "@/locales/ge.json";

export default createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    ge,
  },
});
