import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-graphql-client',
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  runtimeConfig: {
    public: {
      GQL_HOST: 'http://host.docker.internal/graphql' // overwritten by process.env.GQL_HOST
    }
  },
  build: {
    transpile: ['vuetify']
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})