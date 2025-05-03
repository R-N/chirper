import { createI18n as _createI18n } from "vue-i18n";
import axios from "@/plugins/axios.js";
import { deepMerge, getData } from "@/libs/util";

export let locales = [
  { value: "en", title: "English" },
  { value: "id", title: "Bahasa Indonesia" }
];
export let messages = {};

export const loadLocaleMessages = (files, trim) => {
  const messages = {};
  const regex = new RegExp(`^\.?\/?${trim}\/?`);

  for (const path in files) {
    const fileModule = files[path];
    const parts = path
      .trim(".")
      .trim("/")
      .replace(regex, "")
      .trim("/")
      .replace(/\.json$/, "")
      .split("/");

    const [locale, ...nestedKeys] = parts;

    let current = (messages[locale] ||= {});

    // Check if the structure is nested and load it accordingly
    if (nestedKeys.length > 1) {
      for (let i = 0; i < nestedKeys.length - 1; i++) {
        const part = nestedKeys[i];
        current = current[part] ||= {};
      }
      current[nestedKeys[nestedKeys.length - 1]] =
        fileModule.default || fileModule;
    } else {
      // Flat structure
      current[nestedKeys[0]] = fileModule.default || fileModule;
    }
  }

  return messages;
};

export const fetchLocales = async () => {
  const res = await axios.get(route("api.lang.index"));
  return getData(res.data, "locale");
};

export const fetchTranslations = async (locale) => {
  const res = await axios.get(route("api.lang.get", locale));
  return getData(res.data, "translation");
};

export const fetchAll = async () => {
  const locales = await fetchLocales();
  const messages = {};
  for (const l of locales) {
    messages[l] = await fetchTranslations(l);
  }
  return messages;
};

export let i18nInstance = null;

export const createI18n = async () => {
  messages = [
    loadLocaleMessages(
      import.meta.glob("/resources/js/lang-gen/**/*.json", { eager: true }),
      "resources/js/lang-gen"
    ),
    await fetchAll(),
    loadLocaleMessages(
      import.meta.glob("/resources/js/lang/**/*.json", { eager: true }),
      "resources/js/lang"
    )
  ];
  messages = deepMerge(messages);
  let i18n = _createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: messages
  });
  i18nInstance = i18n;
  return i18n;
};

export const getI18n = () => i18nInstance;
export const t = (...args) => i18nInstance?.global.t(...args);
