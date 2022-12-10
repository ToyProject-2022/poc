export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
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
  proxy: {
    '/v1': { target: 'http://13.124.73.181:8081', pathRewrite: { '^/v1': '' } },
  }, // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css',
    { src: '@/styles/reset.scss', lang: 'scss' },
    { src: '@/styles/import.scss', lang: 'scss' },
    'element-ui/lib/theme-chalk/index.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/element-ui' },
    { src: '@/plugins/validation', ssr: true },
    { src: '@/plugins/color-picker', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    path: '~/components',
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/proxy'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/, 'vee-validate/dist/rules'],
  },
}
