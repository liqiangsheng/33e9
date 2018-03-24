# lee_vue

> 2017_07_17

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```


  /Login                    Login 登录
 /jumpauthen                JumpAuthen  跳转认证
 /authen                    Authen 认证
 /uploadCertificate         uploadCertificate 认证上传照片
 /serviceComplete           serviceComplete 认证完成
 /auditSubmission           auditSubmission 认证完成等待
  /serviceCity              ServiceCity 城市
  /serviceArea              ServiceArea 区域
  /serviceSkill             ServiceSkill 技能
  /orderDetails             orderDetails 订单详情
  /serviceList              serviceList 服务清单
    /addService               addService 服务清单页面的添加服务
    /serviceaBill             serviceaBill 服务清单页面的服务账单
    /serviceSuccess           serviceSuccess  服务清单完成页面
  /mainMenu                 MainMenu 主菜单
   /mainMenu/d_plate        d_plate 主菜单，叮板
   /mainMenu/d_order        d_order 主菜单，订单
   /mainMenu/d_my           d_my 主菜单，我的
  /equipmentPrice           equipmentPrice  主菜单叮板，配件价格表
  /report                   report 主菜单订单中心,报备
  /userList                 UserList 个人页面的列表
  /userList/personalData     personalData 个人页面的个人资料
  /userList/leave            leave 个人页面的请假
  /userList/historyOrder     historyOrder 个人页面的历史订单
  /userList/commonProblem    commonProblem 个人页面的常见问题
  /userList/feedback         feedback 个人页面的意见反馈
  /systemNews                systemNews 系统消息


  0.地址 http://app.test.dingdingkuaixiu.com
  1.服务城市第一个id传0   其他的不用传
  2.请求地址 http://master.pre.dingdingkuaixiu.com  服务区域/areainfo/findListareaInfo 接口
  3.技能请求链接 /findlabelbusinessoptions



"certificateState": "0",  0.未认证 1认证中 2认证通过3认证驳回
state": "1"  1，正常  2，禁用


阉割功能：
1.服务清单的添加服务 没有这个接口
2.主页面的头部提示，在线时长，今日流水没有
3.


首页订单
// 今日单量
  private int todaysinglequantity;
  // 完成单量
  private int completionquantity;
  // 最新订单数据
  private CoreMainOrder coremainorder;
  // 服务列表
  private List<CoreMainOrderServiceBean> services;
  //未读消息数量
  private int unReadMsgSize;
  //待收款费用
  private String receivablesFee;


 `id` varchar(32) NOT NULL COMMENT '师傅编号',
  `name` varchar(20) DEFAULT NULL COMMENT '师傅名称',
  `type` varchar(1) DEFAULT NULL COMMENT '师傅类型(1.自营师傅2.兼职师傅3.网点师傅)',
  `level` varchar(32) DEFAULT NULL COMMENT '师傅等级',
  `phone_num` varchar(11) DEFAULT NULL COMMENT '师傅手机号',
  `img_url` varchar(100) DEFAULT NULL COMMENT '师傅头像',
  `evaluate` varchar(20) DEFAULT NULL COMMENT '评分',
  `city_id` varchar(32) DEFAULT NULL COMMENT '所属城市id',
  `city` varchar(20) DEFAULT NULL COMMENT '所属城市',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `login_time` datetime DEFAULT NULL COMMENT '近期登陆',
  `site_id` varchar(32) DEFAULT NULL COMMENT '网点id',
  `site` varchar(40) DEFAULT NULL COMMENT '网点',
  `state` varchar(1) DEFAULT NULL COMMENT '状态(1.正常2.禁用)',
  `forbidden_cause` varchar(200) DEFAULT NULL COMMENT '禁用描述',
  `forbidden_remark` varchar(200) DEFAULT NULL COMMENT '禁用描述',
  `id_photos` varchar(2048) DEFAULT NULL COMMENT '证件照片(最多上传10张)',
  `id_num` varchar(100) DEFAULT NULL COMMENT '身份证号码',
  `certificate_state` varchar(1) DEFAULT NULL COMMENT '认证状态(0.未认证 1认证中 2认证通过3认证驳回)',
  `certificate_remark` varchar(200) DEFAULT NULL COMMENT '认证描述',
  `emergency_contact` varchar(20) DEFAULT NULL COMMENT '紧急联系人',
  `emergency_phone_num` varchar(11) DEFAULT NULL COMMENT '紧急联系电话',
  `service_score` int(11) DEFAULT NULL COMMENT '服务分',
  `all_order_count` int(11) DEFAULT NULL COMMENT '总单数',
  `complete_count` int(11) DEFAULT NULL COMMENT '已完成',
  `all_total` decimal(11,2) DEFAULT NULL COMMENT '总流水',
  `settlement_total` decimal(11,2) DEFAULT NULL COMMENT '已结算',
  `wait_allocation` int(11) DEFAULT NULL COMMENT '待分配',
  `wait_service` int(11) DEFAULT NULL COMMENT '待服务',
  `abnormal_hang_up` int(11) DEFAULT NULL COMMENT '异常挂起',
  `abnormal_money` int(11) DEFAULT NULL COMMENT '异常结款',
  `Instead_of_receiving_total` decimal(11,2) DEFAULT NULL COMMENT '代收流水',
  `complain_order` int(11) DEFAULT NULL COMMENT '投诉工单',
  `applause_rate` decimal(11,2) DEFAULT NULL COMMENT '好评率',
  `punctuality_rate` decimal(11,2) DEFAULT NULL COMMENT '准时率',
  `complete_rate` decimal(11,2) DEFAULT NULL COMMENT '完成率',
  `work_state` varchar(32) DEFAULT NULL COMMENT '工作状态',
  `operation_id` varchar(32) DEFAULT NULL COMMENT '操作员id',
  `operation` varchar(40) DEFAULT NULL COMMENT '操作员',







