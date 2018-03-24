// import  '../static/css/base'
import  '../static/js/client'
import Vue from 'vue'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router/index'
import axios from 'axios'
import data from './util/mock'  //引入mockjs
import store from  './store/store'

import urlAjax from '@/assets/js/urlAjax'


Vue.config.productionTip = false

Vue.prototype.$axios=axios  //注册全局
Vue.prototype.$addressUrl=urlAjax.addressUrl //请求地址
Vue.prototype.$allUrl=urlAjax.url //URL所有请求地址
Vue.prototype.$ALL=urlAjax //所有请求地址

import c_header from './components/common/c_header.vue'
Vue.component('C_header',c_header); //头部全局注册
import c_button from './components/common/c_button.vue'
Vue.component('C_button',c_button); //按钮全局注册
import c_order from './components/common/c_work_order.vue'
Vue.component('C_order',c_order); //work_order全局注册
import c_all_order from './components/common/c_all_orders.vue'
Vue.component('C_all_order',c_all_order); //所有订单全局注册
import c_no_order from './components/common/c_no_order.vue'
Vue.component('c_no_order',c_no_order); //没有订单

const VM=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
