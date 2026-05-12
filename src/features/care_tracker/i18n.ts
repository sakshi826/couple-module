import { createI18nInstance } from '../../lib/i18n';
import en from './en.json';

const instance = createI18nInstance({
  en: { translation: en }
});

export default instance;

export { SUPPORTED_LANGUAGES } from '../../lib/i18n-config';

