module.exports = {
  transpileDependencies: [],
  configureWebpack: {
    devServer: {
      proxy: {
        '/api/*': {
          // adres wcześniej uruchomionego backendu
          target: 'http://localhost:3000',
          changeOrigin: true,
          logLevel: 'debug',
          xfwd: false
        }
      }
    }
  }
}
