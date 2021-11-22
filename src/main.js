import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import('./assets/scss/common.scss')
// import BaiduMap from 'vue-baidu-map'
import './icons/index'
import SvgIcon from './components/svg-icon/svg-icon'
const app = createApp(App)
app.use(store).use(router).component('svg-icon', SvgIcon).mount('#app')

//  .use(BaiduMap, {
//     ak: '1vW3BqNGDMh6Zn9l4W5ASu3Gp4d7knT0'
//   })
