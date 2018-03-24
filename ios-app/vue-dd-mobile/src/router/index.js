import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'

import Login from '@/components/components_father/Login'  //登录
import loginManagement from '@/components/components_son/login/teacher_management'  //登录
import JumpAuthen from '@/components/components_son/jumpAuthen/fatherJumpAuthen'  //跳转认证
import Authen from '@/components/components_son/authen/authen' //认证
import serviceComplete from '@/components/components_son/authen/serviceComplete' //认证上传照片
import uploadCertificate from '@/components/components_son/authen/uploadCertificate' //认证完成
import auditSubmission from '@/components/components_son/authen/auditSubmission' //认证完成等待
import ServiceCity from '@/components/components_son/serviceCity/servicecity' //城市
import ServiceArea from '@/components/components_son/serviceArea/servicearea' //区域
import ServiceSkill from '@/components/components_son/serviceSkill/serviceskill' //技能
import orderDetails from '@/components/components_son/orderDetails/orderDetails' //订单详情
import serviceList from '@/components/components_son/serviceList/serviceList' //服务清单
import addService from '@/components/components_son/serviceList/addService' //服务清单页面的添加服务
import serviceaBill from '@/components/components_son/serviceList/serviceaBill' //服务清单页面的服务账单
import serviceSuccess from '@/components/components_son/serviceSuccess/serviceSuccess' //服务清单页面的完成账单页面

import MainMenu from '@/components/components_father/MainMenu' //主菜单
import d_plate from '@/components/components_son/d_main_menu/d_plate' //主菜单，叮板
import d_order from '@/components/components_son/d_main_menu/d_order' //主菜单，订单
import d_my from '@/components/components_son/d_main_menu/d_my' //主菜单，我的
import equipmentPrice from '@/components/components_son/d_main_menu/userList/equipmentPrice' //主菜单叮板，配件价格表
import equipmentPriceIframe from '@/components/components_son/d_main_menu/userList/equipmentPriceIframe/equipmentPriceIframe' //主菜单叮板，配件价格表iframe
import report from '@/components/components_son/d_main_menu/userList/report' //主菜单订单中心，报备
import UserList from '@/components/components_son/d_main_menu/userList/UserList' //个人页面的列表
import personalData from '@/components/components_son/d_main_menu/userList/personalData' //个人页面的个人资料
import leave from '@/components/components_son/d_main_menu/userList/leave' //个人页面的请假
import historyOrder from '@/components/components_son/d_main_menu/userList/historyOrder' //个人页面的历史订单
import commonProblem from '@/components/components_son/d_main_menu/userList/commonProblem' //个人页面的常见问题
import commonProblemSon from '@/components/components_son/d_main_menu/userList/commonProblemSon/commonProblemSon' //个人页面的常见问题 收费标准

import feedback from '@/components/components_son/d_main_menu/userList/feedback' //个人页面的意见反馈
import aboutSystem from '@/components/components_son/d_main_menu/userList/about_system' //个人页面的关于我们

import uploadImg from '@/components/components_son/authen/upload_img' //test img上传

import systemNews from '@/components/components_son/systemNews/systemNews' //系统消息


Vue.use(Mint)
Vue.use(Router)

export default new Router({
  // mode:'history',  //去除路径的#
  routes: [
    {
      // path: '/', name: 'login',redirect:'/mainMenu/d_my',component: Login
      // path: '/', name: 'login',redirect:'/mainMenu/d_order',component: Login
      path: '/', name: 'login',component: Login
    },{ //师傅管理条例
      path: '/loginManagement', name: 'loginManagement', component: loginManagement,
    },{ //认证跳板
      path: '/jumpauthen', name: 'JumpAuthen', component: JumpAuthen,
    },{ //认证信息
      path: '/authen', name: 'authen',component: Authen,
    },{ //认证上传照片
      path: '/uploadCertificate', name: 'uploadCertificate',component: uploadCertificate,
    },{ //认证完成
      path: '/serviceComplete', name: 'serviceComplete',component: serviceComplete,
    },{ //认证完成等待
      path: '/auditSubmission', name: 'auditSubmission', component: auditSubmission,
    },{ //城市
      path: '/serviceCity', name: 'serviceCity', component: ServiceCity,
    },{ //区域
      path: '/serviceArea', name: 'serviceArea', component: ServiceArea,
    },{ //服务技能
      path: '/serviceSkill', name: 'serviceSkill', component: ServiceSkill,
    },
    { //main主菜单
      path: '/mainMenu', name: 'MainMenu', component: MainMenu,
      children:[
        { //叮板
          path:'d_plate', name:'d_plate', component:d_plate
        },
        { //订单
          path:'d_order', name:'d_order', component:d_order
        },
        { //我的
          path:'d_my', name:'d_my', component:d_my
        },
      ]
    },
    { //个人页面的列表
      path:'/userList', name:'userList', component:UserList,
      children:[
        { //个人资料
          path:'personalData', name:'personalData', component:personalData
        },
        { //请假
          path:'leave', name:'leave', component:leave
        },
        { //历史订单
          path:'historyOrder', name:'historyOrder', component:historyOrder
        },
        { //常见问题
          path:'commonProblem', name:'commonProblem', component:commonProblem
        },
        { //常见问题  收费标准 高空问题 配件问题 质保期
          path:'commonProblemSon', name:'commonProblemSon', component:commonProblemSon
        },
        { //意见反馈
          path:'feedback', name:'feedback', component:feedback
        },
        { //关于我们
          path:'aboutSystem', name:'aboutSystem', component:aboutSystem
        }
      ]
    },
    {//配件价格表
      path:'/equipmentPrice', name:'equipmentPrice', component:equipmentPrice
    },
    {//配件价格表的iframe
      path:'/equipmentPriceIframe', name:'equipmentPriceIframe', component:equipmentPriceIframe
    },
    {//异常报备
      path:'/report',name:'report',component:report
    },
    {//订单详情
      path:'/orderDetails',name:'orderDetails',component:orderDetails
    },
    {//服务清单
      path:'/serviceList', name:'serviceList', component:serviceList
    },
    {//添加服务
      path:'/addService', name:'addService', component:addService
    },
    {//服务账单
      path:'/serviceaBill', name:'serviceaBill', component:serviceaBill
    },
    {//服务完成
      path:'/serviceSuccess', name:'serviceSuccess', component:serviceSuccess
    },
    {//test img上传
      path:'/uploadImg',name:'uploadImg',component:uploadImg
    },
    {//系统消息
      path:'/systemNews',name:'systemNews',component:systemNews
    },
  ]
})
