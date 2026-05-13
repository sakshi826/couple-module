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

  const resources: Record<string, any> = {};

  const deepMerge = (target: any, source: any) => {
    if (!source) return target;
    for (const key in source) {
      if (source[key] instanceof Object && !Array.isArray(source[key])) {
        if (!target[key] || typeof target[key] !== 'object') target[key] = {};
        deepMerge(target[key], source[key]);
      } else if (source[key] !== null && source[key] !== undefined) {
        target[key] = source[key];
      }
    }
    return target;
  };

  for (const path in locales) {
    let lang = '';
    
    // Pattern 1: .../lang.json (e.g. en.json)
    const match1 = path.match(/\/([^/]+)\.json$/);
    // Pattern 2: .../lang/translation.json
    const match2 = path.match(/\/([^/]+)\/[^/]+\.json$/);
    
    if (match1 && match1[1] !== 'translation') {
      lang = match1[1];
    } else if (match2) {
      lang = match2[1];
    }
    
    if (lang) {
      const originalLang = lang;
      // Normalize language codes
      if (lang === 'zh-CN' || lang === 'zh') lang = 'zh-Hans';
      if (lang === 'zh-TW' || lang === 'zh-HK') lang = 'zh-Hant';
      if (lang === 'pt-BR' || lang === 'pt-PT') lang = 'pt';
      if (lang === 'fil') lang = 'tl';
      
      const content = locales[path].default || locales[path];
      
      if (!resources[lang]) {
        resources[lang] = { translation: {} };
      }
      
      deepMerge(resources[lang].translation, content);

      // Map original lang to normalized lang if different
      if (lang !== originalLang) {
        resources[originalLang] = resources[lang];
      }
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
