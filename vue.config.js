const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pwa: {
    name: 'Selfish OSS'
  },
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map'
  }
})
