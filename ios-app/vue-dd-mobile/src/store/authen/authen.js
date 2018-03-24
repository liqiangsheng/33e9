/**
 * Created by Administrator on 2017/12/19.
 */
//初始化store
const authenVuxBox= {
  state: {  //存储数据
    login:{},  //登录请求返回的数据
    weiXinAppid:{},//微信的相关信息

    userName:null,  //姓名
    ID:null,  //身份证
    emergencyContact:null, //紧急联系人
    emergencyContactTel:null, //紧急联系人电话

    systemMsg:null,//通知消息

  },
  mutations: { //mutations直接跟state同步
    login(state,login){
      return state.login=login
    },
    weiXinAppid(state,weiXinAppid){
      return state.weiXinAppid=weiXinAppid
    },
    userName(state, address_header){
      return state.userName = address_header;
    },
    ID(state, address_header){
      return state.ID = address_header;
    },
    emergencyContact(state, address_header){
      return state.emergencyContact = address_header;
    },
    emergencyContactTel(state, emergencyContactTel){
      return state.emergencyContactTel = emergencyContactTel;
    },
    systemMsg(state, systemMsg){
      return state.systemMsg = systemMsg;
    },
  },
  actions: {  //actions操作mutations,actions可以是异步
    login(context,login){
      context.commit('login',login)
    },
    weiXinAppid(context,weiXinAppid){
      context.commit('weiXinAppid',weiXinAppid)
    },

    userName(context, userName){
      context.commit('userName', userName);
    },
    ID(context, ID){
      context.commit('ID', ID);
    },
    emergencyContact(context, emergencyContact){
      context.commit('emergencyContact', emergencyContact);
    },
    emergencyContactTel(context, emergencyContactTel){
      context.commit('emergencyContactTel', emergencyContactTel);
    },
    systemMsg(context, systemMsg){
      context.commit('systemMsg', systemMsg);
    },
  },
  getters: { //获取state里面的数据
    login(state){
      return state.login;
    },
    weiXinAppid(state){
      return state.weiXinAppid;
    },
    userName(state){
      return state.userName;
    },
    ID(state){
      return state.ID;
    },
    emergencyContact(state){
      return state.emergencyContact;
    },
    emergencyContactTel(state){
      return state.emergencyContactTel;
    },
    systemMsg(state){
      return state.systemMsg;
    },
  }
}

export default authenVuxBox;
