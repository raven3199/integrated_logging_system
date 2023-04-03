module.exports = {
  devServer: {
    proxy:{
      '/api':{
        target:'http://10.24.237.141:8181', //后端地址
        changeOrigin:true,
        pathRewrite:{'^/api':''}
      }
    }
  }
}
