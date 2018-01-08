	var actiontimer = -1;
	var listaction = -1;
	$(function(){
		// 设置 登录名
		$("#login_server_img").click(function(){
			$("#login_server_pull").css("display","block");
		});
		// 登录服务器 的下拉菜单
		$("#login_server_pull li").mouseover(function(){
			$(this).addClass("onhover");
		}).mouseout(function(){
			$(this).removeClass("onhover");
		}).mouseup(function(){
			$("#server_name").val($(this).text());
			$("#login_server_pull").css("display","none");
		});
		$("#server_name").click(function(){
			setTimeout(function(){
				$("#login_server_pull").css("display","none");
			},1000)
			
		}); 
		$(".inputLayer").click(function(){
			$(".inputLayer").css("display","none");
			$("#server_name").val("").focus();
			$("#login_server_pull").css("display","none");
		});
		$(".inputLayer1").click(function(){
			$(".inputLayer1").css("display","none");
			$("#login_cpyname").val("").focus();
		});
		$(".inputLayer2").click(function(){
			$(".inputLayer2").css("display","none");
			$("#login_psd").val("").focus();
		});
		// inut 聚焦事件
	})
	
	function showList()
	{
		if(listaction == "hide")
		{
			$("#userNameList").css("display","none");
			$(this).removeClass("onname");
		}else
		{			
			$("#userNameList").css("display","block");
			$(this).addClass("onname");
		}
		actiontimer = -1;
	}

	function changeImg(){
		if($(".login_name_img").attr("src") == "image/pull_down.png"){
			$(".login_name_img").attr("src","image/pull_up.png");
		}else{
			$(".login_name_img").attr("src","image/pull_down.png");
			$(".strItem").hide();
		}
		
	}
	function loginUp(){

		$(".login_button button").attr({"disabled":"disabled"});
		$(".login_button button").css({"backgroundColor":"#ccc","border":"1px solid #ccc"});
	}
	// cookie方法
	 function getCookie(c_name)
        {
            if (document.cookie.length>0)
            {
                c_start=document.cookie.indexOf(c_name + "=")
                if (c_start!=-1)
                {
                    c_start=c_start + c_name.length+1
                    c_end=document.cookie.indexOf(";",c_start)
                    if (c_end==-1) c_end=document.cookie.length
                    return unescape(document.cookie.substring(c_start,c_end))
                }
            }
            return ""
        }

        function setCookie(c_name,value,expiredays)
        {
            var exdate=new Date()
            exdate.setDate(exdate.getDate()+expiredays)
            document.cookie=c_name+ "=" +escape(value)+
                ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
        }

        function checkCookie()
        {
            username=getCookie('username')
            if (username!=null && username!="")
            {alert('Welcome again '+username+'!')}
            else
            {
                username=prompt('Please enter your name:',"")
                if (username!=null && username!="")
                {
                    setCookie('username',username,365)
                }
            }
        }
