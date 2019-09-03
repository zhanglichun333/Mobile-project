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
      '/': {
        target: 'http://localhost:3000/',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
