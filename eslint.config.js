import js from '@eslint/js'
import globals from 'globals'
import * as vueParser from 'vue-eslint-parser'
import vuePlugin from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default [
  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Vue files configuration
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/max-attributes-per-line': [
        'off',
        {
          singleline: {
            max: 5,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/html-self-closing': [
        'off',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
        },
      ],
    },
  },

  // JS/TS files configuration
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // General rules
      'no-console': 'off',
      'no-debugger': 'warn',
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },

  // Global ignores
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.local',
      '.vscode',
      '.idea',
      '.DS_Store',
      '*.d.ts',
    ],
  },
]
