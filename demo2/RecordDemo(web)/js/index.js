 //即将离开当前页面触发的事件
    window.onbeforeunload = function() { 
        if(g_logining){
            //注销本次登陆
            CRVideo_Logout();
        }
        if(g_init){
            //反初始化
            CRVideo_Uninit();
        }
        if(g_residual_timer != -1){
            clearInterval(g_residual_timer);
            g_residual_timer = -1;
        }
        if(g_layout != null){
            $(".detail_box").css('display','none');
        }
    }
    //按下键盘的事件
    document.onkeydown = function (e) {
        var ev = window.event || e;
        var code = ev.keyCode || ev.which;
        //F5刷新
        if (code == 116) {
            // 谷歌的兼容
            if(ev.preventDefault) {
                ev.preventDefault();
                //替换登陆的地址
                location.replace(location.href)
            } else {
                // IE的兼容
                ev.keyCode = 0;
                ev.returnValue = false;
                location.replace(location.href)
            }
        }
    }
    //阻止右键
    window.document.oncontextmenu=function(){
        return false;
    }
  
    //键盘回车
    $("body").keydown(function(e){
       
        if(event.keyCode == "13"){
           login()
           $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
        }
    });

//登陆
 //点击下拉 设置登录名
    $("#login_server_img").click(function(){
        $(".pull_down_name").css({display:"block"})
    })
    //
    $("#login_server_pull li").mouseover(function(){
        $(this).addClass("onhover")
    }).mouseout(function(){
        $(this).removeClass("onhover")
    }).mouseup(function(){
        $("#server_name").val($(this).html())
        $(".pull_down_name").css({display:"none"})
    });
    //点击聚焦 账号
    $(".inputLayer").click(function(){
        $(".inputLayer").css({display:"none"});
        $("#server_name").val("").focus();
    })
   //账号
    $(".inputLayer1").click(function(){
        $(".inputLayer1").css({display:"none"});
        $("#login_cpyname").val("").focus();
        if($("#login_cpyname").val()==""||$("#login_cpyname").val()==null){
        	  alert({
            	  title:'提示',
				  content:'账号不能为空',
				  noText:'取消',
				  yesText:'确定'
            });
        }
    })
    //密码
    $(".inputLayer2").click(function(){
        $(".inputLayer2").css({display:"none"});
        $("#login_psd").val("").focus();
         if($("#login_psd").val()==""||$("#login_cpyname").val()==null){
        	  alert({
            	  title:'提示',
				  content:'密码不能为空',
				  noText:'取消',
				  yesText:'确定'
            });
        }
    })

  //点击事件
    $("#login_bnt").click(function(){
        $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
        //获取input框的值跟后台数据对比判断
        login()
    })
    
     //登陆成功
        CRVideo_LoginSuccess.callback = function(userID,cookie){
            alert({
            	  title:'提示',
				  content:'登陆成功',
				  noText:'取消',
				  yesText:'确定'
            });
            $("#login_bnt").attr({"disabled":"disabled"}).css({background:"#ccc"})
            g_logining = true;
        }
    //登录失败
        CRVideo_LoginFail.callback = function(sdkErr,cookie){
              alert({
            	  title:'提示',
				  content:'登陆失败'+sdkErr,
				  noText:'取消',
				  yesText:'确定'
            });
            $("#login_bnt").attr({"disabled":false}).css({background:"#eb5405"})
            g_logining = false;
        }


//***********************************************************************