export default {
  head: {
    title: 'poc-nuxt',
    server: {
      host: '0.0.0.0',
      port: 3200,
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [
    'normalize.css',
    { src: '@/styles/import.scss', lang: 'scss' },
    'element-ui/lib/theme-chalk/index.css',
  ],
  plugins: [
    { src: '@/plugins/element-ui' },
    { src: '@/plugins/validation', ssr: true },
    { src: '@/plugins/color-picker', mode: 'client' },
    { src: '@/plugins/inject/_canvas', mode: 'client' },
    { src: '@/plugins/inject/_cookie' },
    { src: '@/plugins/inject/_copy' },
    { src: '@/plugins/inject/_axios' },
    { src: '@/plugins/inject/_auth' },
  ],
  components: {
    path: '~/components',
  },
  dayjs: {
    locales: ['ko'],
    defaultLocale: 'ko',
    plugins: ['advancedFormat'],
  },
  axios: {
    proxy: true,
    progress: false,
    prefix: '/ajax',
  },
  proxy: {
    '/ajax': { target: 'http://13.124.73.181:8081', pathRewrite: { '^/ajax': '' } },
  },
  loading: true,
  router: {
    middleware: ['router'],
    extendRoutes(routes) {
      routes.push({
        hidden: true,
        path: '/redirect/:path*',
        component: '@/pages/redirect.vue',
      })
    },
  },
  modules: ['@nuxtjs/proxy', '@nuxtjs/axios', '@nuxtjs/dayjs'],
  buildModules: ['@nuxtjs/eslint-module', '@nuxt/postcss8'],
  build: {
    postcss: {
      preset: {
        autoprefixer: {
          grid: true,
        },
      },
    },
    transpile: [
      /^element-ui/,
      'vee-validate/dist/rules',
      'dom7',
      'svgo',
      ({ isDev, isLegacy }) => isDev && isLegacy && 'ansi-regex',
      ({ isDev, isLegacy }) => isDev && isLegacy && 'strip-ansi',
    ],
  },
}
