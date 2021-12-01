import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import('./assets/style/common.scss')
import('./assets/style/_font.scss')
// import BaiduMap from 'vue-baidu-map'
import './icons/index'
import DataV from './plugins/@jiaminghi/data-view'
const app = createApp(App)
app.use(store).use(router).use(DataV).mount('#app')

//  .use(BaiduMap, {
//     ak: '1vW3BqNGDMh6Zn9l4W5ASu3Gp4d7knT0'
//   })
