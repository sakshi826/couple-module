import { createI18nInstance } from '../../lib/i18n';

const instance = createI18nInstance({
  en: { translation: {} }
});

export default instance;

export { SUPPORTED_LANGUAGES } from '../../lib/i18n-config';
