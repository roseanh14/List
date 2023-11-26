import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import englishTranslation from './translations/english/translation.json';
import czechTranslation from './translations/czech/translation.json';
import germanTranslation from './translations/german/translation.json';

const resources = {
  en: { translation: englishTranslation },
  cs: { translation: czechTranslation },
  de: { translation: germanTranslation },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;