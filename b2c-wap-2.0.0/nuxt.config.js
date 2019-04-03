// const pkg = require('./package')
const Qs = require('qs')
const processEnv = process.env;
require("babel-core").transform("code");

console.log('processEnv.NODE_ENV: ', processEnv.NODE_ENV)
let curBaseUrl = '';
switch( processEnv.NODE_ENV ){
  case 'proxy':
    curBaseUrl = '/dapi';
    break;
  case 'development':
    // curBaseUrl = 'http://192.168.2.254:8080/AKGW-api/v1';
    curBaseUrl = 'http://web.api.ak1ak1.com:8080/AKGW-api/v1';
    break;
  case 'private':
    curBaseUrl = 'http://113.108.163.210:9999/AKGW-api/v1';
    break;
  case 'production':
    curBaseUrl = 'http://113.108.163.210:9999/AKGW-api/v1';
    break;
  default: 
  curBaseUrl = 'http://192.168.2.254:8080/AKGW-api/v1';
}
console.log('curBaseUrl: ', curBaseUrl)

module.exports = {
  mode: 'universal',
  //为Nuxt.js应用程序定义.nuxt(默认)目录 默认: .nuxt
  // buildDir: 'nuxt-dist',

  /*
  ** Headers of the page
  */
  head: {
    title: '阿康大药房',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1,user-scalable=no' },
      { hid: 'keywords', name: 'Keywords', content: "阿康大药房,药房网，网上药店，处方药网购，网上买药，药品网，新特药买药购药就上阿康大药房" },
      { hid: 'description', name: 'description', content: "网上买药找药去哪个网站？药房网、网上药店、处方药网购哪个好？买药品最正规的网站【阿康大药房】经国家药监局批准的专业药房网,可选同仁堂等品牌产品的网上药店!-阿康大药房" },
      { name: 'Robots', content: 'All' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    script: [
      { innerHTML: `!function(_window, _document) {
        var _documentEle = _document.documentElement,
          devicePixelRatio = _window.devicePixelRatio || 1;
    
        function count() {
          //1rem = 37.5px; 
          // var _cwidth = _documentEle.clientWidth / 10;
          // var _cwidth = _documentEle.clientWidth / 10;
          var _cwidth = _documentEle.clientWidth / 10;
          _documentEle.style.fontSize = _cwidth + "px";
        };
    
        if (
          function e(){ 
            _document.body ? _document.body.style.fontSize = "16px" : _document.addEventListener("DOMContentLoaded", _window);
          }(), 
          count(), 
          _window.addEventListener("resize", count), 
          _window.addEventListener("pageshow", function(e) { _window.persisted && count() }), 
          devicePixelRatio >= 2
          ){
          var createElementBody = _document.createElement("body"),
            creareDiv = _document.createElement("div");
          creareDiv.style.border = ".5px solid transparent", createElementBody.appendChild(creareDiv), _documentEle.appendChild(createElementBody), 1 === creareDiv.offsetHeight , _documentEle.removeChild(createElementBody);
        };
      }(window, document);`, type: 'text/javascript', body: false },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },

  // 自定义主HTML模板中使用的全局ID以及主Vue实例名称和其他选项。 
  globalName: 'app',
  globals: {
    id: globalName => `${globalName}`,
    nuxt: globalName => `$${globalName}`,
    context: globalName => `__${globalName.toUpperCase()}__`,
  },

  /*
  ** 配置在客户端和服务端共享的环境变量
  */
  env: {
    // baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    // baseUrl: processEnv.NODE_ENV === 'development'?'/dapi' : 'http://localhost:3000'
    baseUrl: curBaseUrl,
  },
  
  // 为应用程序内部nuxt.config.js中定义服务器访问主机和端口.
  server: {
    port: 3000, // default: 3000
    host: 'localhost', // default: localhost,
  },

  // vue.config属性为Vue.config提供直接配置
  vue: {
    config: {
      silent: processEnv.NODE_ENV==='development' || processEnv.NODE_ENV==='proxy', 
      productionTip: true,
      devtools: processEnv.NODE_ENV==='development' || processEnv.NODE_ENV==='proxy'
    }
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  transition: 'fade',
  layoutTransition: 'layoutSide',

  /*
  ** Global CSS
  */
  css: [
    '@/assets/style/global.scss'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: curBaseUrl || '',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: [function(data){
      data = Qs.stringify(data)
      return data
    }],
    timeout: 1000000,
    withCredentials: true,
    // prefix: '/api/',
    // baseURL: processEnv.NODE_ENV === 'development'?'/dapi' : 'http://localhost:3000/te/',
    // prefix: '/dapi',
    proxy: processEnv.NODE_ENV=='proxy'? true : false,
  },
  proxy: {
    // '/dapi': {
    //   target: 'http://113.108.163.210:9999',
    //   pathRewrite: {'^/dapi': '/AKGW-api/v1'}
    // },
    '/dapi': { target: 'http://113.108.163.210:9999', pathRewrite: {'^/dapi': '/AKGW-api/v1'} }
  },

  /*
  ** Plugins to load before mounting the App
  * 每次你需要使用 Vue.use() 时，你需要在 plugins/ 目录下创建相应的插件文件，并在 nuxt.config.js 中的 plugins 配置项中配置插件的路径。
  */
  plugins: [
    { src: '~/plugins/axios' },
    // { src: '~/plugins/mint-ui', ssr: true },
    { src: '~/plugins/mint-ui', ssr: false },
    { src: '~/plugins/filters', ssr: false },
    { src: '~/plugins/publicComponents', ssr: false },
  ],

  //
  router: {
    linkActiveClass: 'active-link',//全局配置 <nuxt-link> 组件默认的激活类名。默认值： 'nuxt-link-active'
    linkExactActiveClass: 'exact-active-link',//默认值： 'nuxt-link-active'
    scrollBehavior: (to, from, savedPosition) => {
      // savedPosition 只有在 popstate 导航（如按浏览器的返回按钮）时可以获取。
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        // 目标页面子组件少于两个
        if (to.matched.length < 2) {
          // 滚动至页面顶部
          position = { x: 0, y: 0 }
        }
        else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
          // 如果目标页面子组件中存在配置了scrollToTop为true
          position = { x: 0, y: 0 }
        }
        // 如果目标页面的url有锚点,  则滚动至锚点所在的位置
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],

  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'mint-ui'],//解决在多个页面内引用 axios，那么在应用打包发布的时候 axios 会被打包多次
    /*
    ** You can extend webpack config here
    */
    // analyze: true,
    // Nuxt.js允许您将dist文件上传到CDN来获得最快渲染性能，只需将publicPath设置为CDN即可。默认: '/_nuxt/
    publicPath: '/wap/',
    // 该扩展方法会被调用两次，一次在服务端打包构建的时候，另外一次是在客户端打包构建的时候。
    extend(config, ctx) {
      // 为 客户端打包 进行扩展配置
      if (ctx.isClient) {
        config.devtool = 'eval-source-map'
      }
    },
    //babel
    // babel: {
    //   presets: ['es2015', 'stage-0']
    // },
    babel: {
      // presets: ['es2015', 'stage-0'],
      // "plugins": [
      //   ["component", {
      //     "libraryName": "mint-ui",
      //     "style": true
      //   }]
      // ]
    },
    //cssSourceMap -- 生成环境不开启
    cssSourceMap: processEnv.NODE_ENV === 'development',
    extractCSS: processEnv.NODE_ENV === 'production',
    postcss: [
      require('postcss-px2rem')({
        // remUnit: 37.5,
        remUnit: 32,
        remPrecision: 2,
      }),
      require('autoprefixer')({
        grid: true
      })
    ],
    //当需要在页面中注入一些变量和mixin而不必每次都导入, 不能在此处使用路径别名(~ 和 @)
    styleResources: {
      scss: './assets/style/variables.scss',
      scss: './assets/style/mixin.scss',
    },
  },
}
