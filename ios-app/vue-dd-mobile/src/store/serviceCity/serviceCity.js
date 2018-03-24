//初始化store
const serviceRechargeVuxBox= {
    state: {  //存储数据
      city:null,
      // numberBox: 5
  },
  mutations: { //mutations直接跟state同步
    increments(state, address_header){
      return state.city = address_header;
    },
    // decrements(state, price){
    //   return state.priceBox -= price;
    // }
  },
  actions: {  //actions操作mutations,actions可以是异步
    increment(context, address_header){
      context.commit('increments', address_header);
    },
    // decrement(context, price){
    //   context.commit('decrements', price);
    // }
  },
  getters: { //获取state里面的数据
    getIncrement(state){
      return state.city;
    },
    // getNumebr(state){
    //   return state.numberBox;
    // }
  }
}

export default serviceRechargeVuxBox;
