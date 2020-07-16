// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css';
import axios from 'axios'
import qs from 'qs';
axios.defaults.baseURL = 'http://127.0.0.1:8089'
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('Authentication')
  console.log(config.url);
  return config
})
Vue.prototype.$qs = qs
Vue.use(Vant);
Vue.config.productionTip = false

Vue.prototype.$user = JSON.parse(window.sessionStorage.getItem("User"))
 
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
