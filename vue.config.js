module.exports = {
  devServer: {
    proxy:{
      '/api':{
        target:'http://localhost:8181', //后端地址
        changeOrigin:true,
        pathRewrite:{'^/api':''}
      }
    }
  }
}
