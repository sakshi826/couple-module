export default {
  contextSeparator: '_',
  // Key separator used in your translation keys
  keySeparator: '.',
  // Namespace separator used in your translation keys
  // If you want to use namespaces, set this to true
  nsSeparator: ':',

  // Array of languages to output
  locales: ['en'],

  // Default value to use for untranslated keys
  defaultValue: (lng, ns, key) => {
    return key;
  },

  // Where to write the generated files
  // This will be overridden by the extraction script
  output: 'src/features/$NAMESPACE/i18n/$LOCALE.json',

  // Pattern to find source files
  input: ['src/features/$NAMESPACE/**/*.{ts,tsx}'],

  // Whether to keep keys that are not found in the source
  keepRemoved: false,

  // Whether to sort the keys
  sort: true,

  // Whether to use a custom function to extract keys
  // By default, it looks for t(), i18n.t(), useTranslation(), Trans
  // You can add more if needed
};
