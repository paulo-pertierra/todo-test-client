import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/apollo',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:80/graphql'
      }
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