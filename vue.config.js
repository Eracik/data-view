process.env.VUE_APP_VERSION = require('./package.json').version
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  // ./所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
  publicPath: '/',
  // 相对于打包路径index.html的路径
  indexPath: 'index.html',
  // 执行build命令后构建的目录
  outputDir: process.env.outputDir || 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',
  // 设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  // 如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'error'。这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
  lintOnSave: false,
  // 生产环境的source map关闭
  productionSourceMap: false,
  // 允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    // 第1个参数：别名，第2个参数：路径  （设置路径别名）
    config.resolve.alias.set('@', resolve('./src'))
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                @import "@/assets/style/_variables.scss";
                @import "@/assets/style/_function.scss";
                @import "@/assets/style/_mixin.scss";`
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      const argv = process.argv
      const icourt = argv[argv.indexOf('--icourt-mode') + 1]

      args[0]['process.env'].MODE = `"${icourt}"`

      return args
    })
    // svg rule loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  },
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: '0.0.0.0',
    port: 6464,
    https: false,
    open: false,
    hotOnly: true,
    // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器
    proxy: {
      // 例如将'localhost:8080/api/xxx'代理到'https://wangyaxing.cn/api/xxx'
      '/api': {
        // 代理到的接口域名地址
        target: process.env.VUE_APP_SERVER,
        // 跨域
        changeOrigin: true,
        // https
        secure: true,
        // 如果本身就带这个前缀,注释掉
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
