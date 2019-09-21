module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        ws: true,
        changeOrigin: true
      }
    },
    port: 9000
  },
  publicPath: './'
}
