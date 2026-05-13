import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { FALLBACK_LANGUAGE } from './i18n-config';

/**
 * Creates and initializes a project-scoped i18n instance.
 * 
 * @param locales - Result of import.meta.glob('./i18n/*.json', { eager: true })
 * @returns Initialized i18next instance
 */
export function createI18nInstance(locales: Record<string, any> = {}) {
  const instance = i18n.createInstance();

  // Convert Vite glob object to i18next resources format
  const resources: Record<string, any> = {};
  
  for (const path in locales) {
    const match = path.match(/\/([^/]+)\.json$/);
    if (match) {
      const lang = match[1];
      resources[lang] = { translation: locales[path].default || locales[path] };
    }
  }

  // If no locales were found, provide a safe fallback structure
  if (Object.keys(resources).length === 0) {
    resources['en'] = { translation: locales }; 
  }

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
        order: ['querystring', 'navigator'],
        lookupQuerystring: 'lang',
        caches: [],
      },
      // Ensure we don't load anything from a backend by default
      // as translations should be bundled or loaded manually
    });

  return instance;
}

export default i18n;
