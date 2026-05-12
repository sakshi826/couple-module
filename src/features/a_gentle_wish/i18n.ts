import { createI18nInstance } from '../../lib/i18n';

// For now, we'll initialize with an empty translation and let extract.js fill it
const instance = createI18nInstance({
  en: { translation: {} }
});

export default instance;

export { SUPPORTED_LANGUAGES } from '../../lib/i18n-config';
