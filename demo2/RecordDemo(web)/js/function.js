//弹窗封装
//alert({
//  title:'提示',
//  content:'我是弹窗',
//  noText:'取消',
//  yesText:'确定'
//})
var alert = function(param){
	
	var title = param.title,
    content = param.content,
    yesText = param.yesText || '确定',
    noText = param.noText,
    yesFn = param.yesFn,
    noFn = param.noFn;
    
var htm = "";
htm += '<div class="lacy-alert"><div class="bgd">';
if (title) htm += '<header class="hd">' + title + '</header>';
htm += '<div class="bd">' + content + '</div></div>';
if (!noText){
    htm += '<footer class="fd">' +
    '<a href="#" class=" alert-btn alert-btn-lg" data-role="closeBtn" id="yes_long_btn">' + yesText + '</a>' +
    '</footer>';
    htm += '</div>';
}
else{
    htm += '<footer class="fd">' +
    '<a href="#" class=" alert-btn alert-btn-st" id="yes_btn">' + yesText + '</a>' +
    '<a href="#" class=" alert-btn alert-btn-st" data-role="closeBtn">' + noText + '</a>' +
    '</footer>';
    htm += '</div>';
}

$("body").append(htm);

 var al = $(".lacy-alert");
 al.on("click", '[data-role="closeBtn"]', function() {
     $(".lacy-alert").remove();
 });

 $("#yes_btn,#yes_long_btn").bind("click" , function () {
     $(".lacy-alert").remove();
     if(param.yesFn){
         param.yesFn();
     }
     param = {};
 });
 
	
}

//**********************************************************************

//登陆的方法

function login(){
	//初始化
	var init = CRVideo_Init("CLOUDROOM",g_location_dir)
	//是否初始化
	g_init = true;
	if(init == CRVideo_WEB_OCX_NOTINSTALLED){
            // 弹出层封装
            alert({
            	  title:'提示',
				  content:'ocx未安装',
				  noText:'取消',
				  yesText:'确定'
            	});
        }else if(init == CRVideo_OCX_VERSION_NOTUPPORTED){
        	alert({
            	  title:'提示',
				  content:'不支持的浏览器',
				  noText:'取消',
				  yesText:'确定'
            });
        }else if(init == CRVideo_WEB_BROWER_NOTUPPORTED){
        	alert({
            	  title:'提示',
				  content:'不支持的插件版本',
				  noText:'取消',
				  yesText:'确定'
            });
        }else if(init != 0){
        	alert({
            	  title:'提示',
				  content:"CRVideo_init sdkErr"+"出错了"+init,
				  noText:'取消',
				  yesText:'确定'
           });
	
        }
     //登陆状态
    if(g_logining ==false){
    	var g_serverName = $("#server_name").val()
           
            if(g_serverName && g_serverName != ""){
            //    console.log(444)
                cr_account= $("#login_cpyname").val() ||"demo@cloudroom.com";
                //md5加密
                cr_psw = md5($("#login_psd").val()) || "e10adc3949ba59abbe56e057f20f883e";
                //昵称
                g_nickname = uuid(32,16)
                //自定义账号
                g_userID = uuid(32,16)
                //设置服务器地址
                CRVideo_SetServerAddr(g_serverName)
                //登录     操作成功则回调CRVideo_LoginSuccess,失败则回调CRVideo_LoginFail
                CRVideo_Login(cr_account, cr_psw, g_nickname, g_userID, "")
                //修改登录状态
                g_logining = true;
		    }else{
		    	$("#login_bnt").attr({"disabled":false}).css({background:"#eb5405"})
		    }

	}
    
}


//*******************************video配置***********************************************
function updateVideoCfg(sizeType,fps,qp){
	var cfg = {};
	cfg.sizeType = sizeType;
	fps = parseInt($("frame_input").val());
	if(fps<5){
		fps = 5;
	}else if(fps>20){
		fps = 20;
	}
	cfg.fps = fps;
	maxbps = video_size_arr[sizeType][2]*1000;
	if(qp == 1){
            cfg.qp_min = 22
            cfg.qp_max = 36
        }else if(qp == 0){
            cfg.qp_min = 22
            cfg.qp_max = 25
        }
    // 系统视频参数设置 
        CRVideo_SetVideoCfg(cfg);
        
    // 图像质量参数 
        CRVideo_SetMediacfg(cfg);
}
//*******************************进入房间***********************************************
function enterRoom(){
	console.log(111)
	$(".menu_box").css("display","none");
	$(".login_box").css("display","none");
	$(".videoPage").css("display","block");
	
}

//*******************************点击了客户信息 基础信息*******************************
$("#showBaseinfo").click(function(){
	showBaseinfo()
});

function showBaseinfo(){
	$("#baseinfoTab").attr("class", "on_tab1"); 
	$("#IdentityATab").removeClass(); 
	$("#IdentityBTab").removeClass(); 
	$("#gereninfo").css("display","block")
	$("#sfzzm").css("display","none")
	$("#sfzfm").css("display","none")
};
//*******************************点击了客户信息 ID正面*******************************
$("#showIdentityA").click(function(){
	showIdentityA()
});

function showIdentityA(){
	$("#baseinfoTab").removeClass(); 
	$("#IdentityATab").attr("class", "on_tab1"); 
	$("#IdentityBTab").removeClass(); 
	$("#gereninfo").css("display","none")
	$("#sfzzm").css("display","block")
	$("#sfzfm").css("display","none")
};


//*******************************点击了客户信息 ID反面*******************************
$("#showIdentityB").click(function(){
	showIdentityB()
});

function showIdentityB(){
	$("#baseinfoTab").removeClass(); 
	$("#IdentityATab").removeClass(); 
	$("#IdentityBTab").attr("class", "on_tab1");
	$("#gereninfo").css("display","none")
	$("#sfzzm").css("display","none")
	$("#sfzfm").css("display","block")
};
//*******************************点击了playImg,suspendImg,stopImg*******************************
$("#playImg").click(function(){
	$("#playImg").css("display","none");
	$("#suspendImg").css("display","block");
	$("#stopImg").css("display","block");
})

$("#suspendImg").click(function(){
	$("#playImg").css("display","block");
	$("#suspendImg").css("display","none");
	$("#stopImg").css("display","block");
})

$("#stopImg").click(function(){
	$("#playImg").css("display","block");
	$("#suspendImg").css("display","none");
	$("#stopImg").css("display","none");
})
