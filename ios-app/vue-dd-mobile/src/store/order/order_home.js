/**
 * Created by Administrator on 2017/12/27.
 */
const orderHomeVuex={
  state:{
    home_data:null,//首页订单
    click_single_order:{}, //点击单个订单
    order_report_id:'',//报备订单id
    order_report_two:'',//点击订单列表是是否显示地图
    order_report_three:'',//点击订单列表是是否显示报备
    order_list_show_number:'',//价格订单展示数量

    order_type1:{},//今日待办
    order_type2:{},//全部待办
    order_type3:{},//已完成
    order_type4:{},//遗留
    order_type5:{},//历史订单

    order_service_list:null,//提交服务的服务清单
    order_service_price_list:{},//服务清单几个列表
    order_service_bill_one:{},//一口价账单展示
    order_service_bill_no_one:{},//非一口价账单展示

    personal_data1:{},  //个人资料

    equipmentPriceIframeSrc:'',//价格列表iframe的src

    dai_shou_kuan:0,//待收款
  },
  mutations:{
    home_data(state,data){
      return state.home_data=data
    },
    click_single_order(state,data){
      return state.click_single_order=data
    },
    order_report_id(state,data){
      return state.order_report_id=data
    },
    order_report_two(state,data){
      return state.order_report_two=data
    },
    order_report_three(state,data){
      return state.order_report_three=data
    },
    order_list_show_number(state,data){
      return state.order_list_show_number=data
    },
    order_type1(state,data){
      return state.order_type1=data
    },
    order_type2(state,data){
      return state.order_type2=data
    },
    order_type3(state,data){
      return state.order_type3=data
    },
    order_type4(state,data){
      return state.order_type4=data
    },
    order_type5(state,data){
      return state.order_type5=data
    },
    order_service_list(state,data){
      return state.order_service_list=data
    },
    order_service_price_list(state,data){
      return state.order_service_price_list=data
    },
    order_service_bill_one(state,data){
      return state.order_service_bill_one=data
    },
    order_service_bill_no_one(state,data){
      return state.order_service_bill_no_one=data
    },
    personal_data1(state,data){
      return state.personal_data1=data
    },
    equipmentPriceIframeSrc(state,data){
      return state.equipmentPriceIframeSrc=data
    },
    dai_shou_kuan(state,data){
      return state.dai_shou_kuan=data
    },
  },
  actions:{
    home_data(context,data){
      context.commit('home_data',data)
    },
    click_single_order(context,data){
      context.commit('click_single_order',data)
    },
    order_report_id(context,data){
      context.commit('order_report_id',data)
    },
    order_report_two(context,data){
      context.commit('order_report_two',data)
    },
    order_report_three(context,data){
      context.commit('order_report_three',data)
    },
    order_list_show_number(context,data){
      context.commit('order_list_show_number',data)
    },
    order_type1(context,data){
      context.commit('order_type1',data)
    },
    order_type2(context,data){
      context.commit('order_type2',data)
    },
    order_type3(context,data){
      context.commit('order_type3',data)
    },
    order_type4(context,data){
      context.commit('order_type4',data)
    },
    order_type5(context,data){
      context.commit('order_type5',data)
    },
    order_service_list(context,data){
      context.commit('order_service_list',data)
    },
    order_service_price_list(context,data){
      context.commit('order_service_price_list',data)
    },
    order_service_bill_one(context,data){
      context.commit('order_service_bill_one',data)
    },
    order_service_bill_no_one(context,data){
      context.commit('order_service_bill_no_one',data)
    },
    personal_data1(context,data){
      context.commit('personal_data1',data)
    },
    equipmentPriceIframeSrc(context,data){
      context.commit('equipmentPriceIframeSrc',data)
    },
    dai_shou_kuan(context,data){
      context.commit('dai_shou_kuan',data)
    },
  },
  getters:{
    home_data(state){
      return state.home_data
    },
    click_single_order(state){
      return state.click_single_order
    },
    order_report_id(state){
      return state.order_report_id
    },
    order_report_two(state){
      return state.order_report_two
    },
    order_report_three(state){
      return state.order_report_three
    },
    order_list_show_number(state){
      return state.order_list_show_number
    },
    order_type1(state){
      return state.order_type1
    },
    order_type2(state){
      return state.order_type2
    },
    order_type3(state){
      return state.order_type3
    },
    order_type4(state){
      return state.order_type4
    },
    order_type5(state){
      return state.order_type5
    },
    order_service_list(state){
      return state.order_service_list
    },
    order_service_price_list(state){
      return state.order_service_price_list
    },
    order_service_bill_one(state){
      return state.order_service_bill_one
    },
    order_service_bill_no_one(state){
      return state.order_service_bill_no_one
    },
    personal_data1(state){
      return state.personal_data1
    },
    equipmentPriceIframeSrc(state){
      return state.equipmentPriceIframeSrc
    },
    dai_shou_kuan(state){
      return state.dai_shou_kuan
    },
  }
}

export default orderHomeVuex;
