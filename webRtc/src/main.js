// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import center from "./common/notificationCenter.js"

import App from './App'




Vue.config.productionTip = false;

// Vue原型上加属性
Vue.prototype.$event = center;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
