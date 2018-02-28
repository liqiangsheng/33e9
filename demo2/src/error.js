if(window["000a0180686911e78dd0a45d36bb8c5c"] === undefined)
{
	/** 
	* sdk错误码
	* @module cr/error
	*/


	//没有错误
	/**
	 * 没有错误
	 * @static
	 */
	CRVideo_NOERR = 0;
	//------------------------------------------
	//
	//基础错误
	//
	//------------------------------------------
	//未知错误
	/**
	 * 未知错误
	 * @static
	 */
	CRVideo_UNKNOWERR = 1;
	//内存不足       
	/**
	 * 内存不足
	 * @static
	 */       
	CRVideo_OUTOF_MEM = 2;
	//sdk内部错误   
	/**
	 * sdk内部错误
	 * @static
	 */       
	CRVideo_INNER_ERR = 3;
	//不支持的sdk版本 
	/**
	 * 不支持的sdk版本
	 * @static
	 */
	CRVideo_MISMATCHCLIENTVER = 4;
	 //参数错误    
	 /**
	 * 参数错误
	 * @static
	 */
	CRVideo_MEETPARAM_ERR = 5;
	//无效数据  
	/**
	 * 无效数据
	 * @static
	 */   
	CRVideo_ERR_DATA = 6;
	 //帐号密码不正确
	 /**
	 * 帐号密码不正确
	 * @static
	 */
	CRVideo_ANCTPSWD_ERR = 7;
	//服务异常	
	/**
	 * 服务异常
	 * @static
	 */	       
	CRVideo_SERVER_EXCEPTION = 8;
	//登录用户被踢下线	
	/**
	 * 登录用户被踢下线
	 * @static
	 */	 
	CRVideo_CRVideoSDK_USER_BEEN_KICKOUT = 10;

	//------------------------------------------
	//
	//网络错误
	//
	//------------------------------------------
	 //网络初始化失败
	 /**
	 * 网络初始化失败
	 * @static
	 */
	CRVideo_NETWORK_INITFAILED = 200;
	//没有服务器信息
	/**
	 * 没有服务器信息
	 * @static
	 */
	CRVideo_NO_SERVERINFO = 201;
	 //服务器没有响应
	 /**
	 * 服务器没有响应
	 * @static
	 */
	CRVideo_NOSERVER_RSP = 202;
	//创建连接失败
	/**
	 * 创建连接失败
	 * @static
	 */
	CRVideo_CREATE_CONN_FAILED = 203;
	//socket异常
	/**
	 * socket异常
	 * @static
	 */
	CRVideo_SOCKETEXCEPTION = 204;
	//网络超时
	/**
	 * 网络超时
	 * @static
	 */
	CRVideo_SOCKETTIMEOUT = 205;
	//连接被关闭
	/**
	 * 连接被关闭
	 * @static
	 */
	CRVideo_FORCEDCLOSECONNECTION = 206;
	//连接丢失
	/**
	 * 连接丢失
	 * @static
	 */
	CRVideo_CONNECTIONLOST = 207;

	//------------------------------------------
	//
	//队列错误
	//
	//------------------------------------------
	//队列ID错误
	/**
	 * 队列ID错误
	 * @static
	 */
	CRVideo_QUE_ID_INVALID = 400;
	 //没有用户在排队
	 /**
	 * 没有用户在排队
	 * @static
	 */
	CRVideo_QUE_NOUSER = 401;
	//排队用户已取消	
	/**
	 * 排队用户已取消
	 * @static
	 */   
	CRVideo_QUE_USER_CANCELLED = 402;
	//队列服务还未开启
	/**
	 * 队列服务还未开启
	 * @static
	 */
	CRVideo_QUE_SERVICE_NOT_START = 403
	//已在其它队列排队(客户只能在一个队列排队)
	/**
	 * 已在其它队列排队(客户只能在一个队列排队)
	 * @static
	 */
	CRVideo_ALREADY_OTHERQUE = 404

	//------------------------------------------
	//
	//呼叫错误
	//
	//------------------------------------------
	//无效的呼叫ID
	/**
	 * 无效的呼叫ID
	 * @static
	 */
	CRVideo_INVALID_CALLID = 600;
	//已在呼叫中
	/**
	 * 已在呼叫中
	 * @static
	 */
	CRVideo_ERR_CALL_EXIST = 601;	
	//对方忙
	/**
	 * 对方忙
	 * @static
	 */
	CRVideo_ERR_BUSY = 602;
	//对方不在线
	/**
	 * 对方不在线
	 * @static
	 */
	CRVideo_ERR_OFFLINE = 603;	
	//对方无应答
	/**
	 * 对方无应答
	 * @static
	 */			
	CRVideo_ERR_NOANSWER = 604;
	//用户不存在
	/**
	 * 用户不存在
	 * @static
	 */
	CRVideo_ERR_USER_NOT_FOUND = 605;
	//对方拒接
	/**
	 * 对方拒接
	 * @static
	 */
	CRVideo_ERR_REFUSE = 606;

	//------------------------------------------
	//
	//会话业务错误
	//
	//------------------------------------------
	//会议不存在或已结束
	/**
	 * 会议不存在或已结束
	 * @static
	 */
	CRVideo_MEETNOTEXIST = 800;
	//会议密码不正确
	/**
	 * 会议密码不正确
	 * @static
	 */
	CRVideo_AUTHERROR = 801;
	 //会议终端数量已满（购买的license不够)
	 /**
	 * 会议终端数量已满（购买的license不够)
	 * @static
	 */
	CRVideo_MEMBEROVERFLOWERROR = 802;
	//分配会议资源失败
	/**
	 * 分配会议资源失败
	 * @static
	 */
	CRVideo_RESOURCEALLOCATEERROR = 803;
	//会议掉线
	/**
	 * 会议掉线
	 * @static
	 */
	CRVideo_MEETOFFLINE = 804;

	//------------------------------------------
	//
	//web错误
	//
	//------------------------------------------
	//ocx未安装
	/**
	 * ocx未安装
	 * @static
	 */
	CRVideo_WEB_OCX_NOTINSTALLED = 1001;
	//不支持的浏览器
	/**
	 * 不支持的浏览器
	 * @static
	 */
	CRVideo_WEB_BROWER_NOTUPPORTED = 1002;
	//不支持的插件版本
	/**
	 * 不支持的插件版本
	 * @static
	 */
	CRVideo_OCX_VERSION_NOTUPPORTED = 1003;
}