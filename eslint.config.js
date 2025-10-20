export default [
  {
    files: ['js/**/*.js'],
    ignores: ['js/vendor/**'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      globals: {
        jQuery: 'readonly',
        $: 'readonly',
        ko: 'readonly',
        _: 'readonly',
        resume: 'readonly',
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        Date: 'readonly',
        Math: 'readonly',
        location: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'semi': ['error', 'always'],
      'quotes': ['warn', 'single'],
    },
  },
];
