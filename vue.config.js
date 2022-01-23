module.exports = {
  // 关闭eslint
  lintOnSave: false,
  // 配置代理服务器解决跨域问题
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
      }
    }
  },
  // 去除map文件
  productionSourceMap: false
}