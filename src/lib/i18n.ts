import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { FALLBACK_LANGUAGE } from './i18n-config';

/**
 * Creates and initializes a project-scoped i18n instance.
 * 
 * @param resources - Initial translation resources (e.g., English keys)
 * @returns Initialized i18next instance
 */
export function createI18nInstance(resources: any = {}) {
  const instance = i18n.createInstance();

  instance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: FALLBACK_LANGUAGE,
      resources,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['querystring', 'localStorage', 'navigator'],
        lookupQuerystring: 'lang',
        caches: ['localStorage'],
      },
      // Ensure we don't load anything from a backend by default
      // as translations should be bundled or loaded manually
    });

  return instance;
}

export default i18n;
