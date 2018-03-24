
import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins/plugin'  //状态前后打印日志

import  authenVuxBox from './authen/authen'  //认证信息
import  orderHomeVuex from './order/order_home'  //首页订单

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
      authenVuxBox,
      orderHomeVuex,
    },
    plugins
})
