import standardConfig from '@rysinal/heroui-vue-standard/eslint';

export default [
  ...standardConfig,
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/react-source/**',
      // VitePress writes generated sources here after a build, and linting them
      // swamps the real report (597 of 811 problems came from six files).
      '**/.vitepress/cache/**',
    ],
  },
];
