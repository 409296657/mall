// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import common from '@/utils/common'
import filter from '@/utils/filter'

Vue.use(ElementUI)

Vue.prototype.axios = axios
Vue.prototype.common = common
Vue.config.productionTip = false

for(let key in filter){
  Vue.filter(key,filter[key])
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
