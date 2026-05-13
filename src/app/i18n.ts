import { createI18nInstance } from '../lib/i18n';
const locales = import.meta.glob(['./i18n/*.json', '../features/*/i18n/**/*.json', '../features/*/translations/**/*.json', '../../public/locales/**/*.json'], { eager: true });

const instance = createI18nInstance(locales);

export default instance;

export { SUPPORTED_LANGUAGES } from '../lib/i18n-config';
