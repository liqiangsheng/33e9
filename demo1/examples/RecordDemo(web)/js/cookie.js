
function cookie(){


//cookie操作： 添加，修改， 查询， 删除 （增删改查）
//设置cookie： 添加，修改
function setCookie(name, value, expires){
	var str = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	if (expires && expires instanceof Date){
		str += "; expires=" + expires;
	}
	document.cookie = str;
	

	
}
//获取cookie

function getCookie(name){
	var str = decodeURIComponent(document.cookie);
	var arr = str.split("; ");
	for (var i=0; i<arr.length; i++) {
		var str1 = arr[i];
		
		var arr1 = str1.split("=");
		if (arr1[0] == name){
			return arr1[1];
		}
	}
	return "";
}

//删除cookie
function removeCookie(name){
	var d = new Date();
	d.setDate(d.getDate()-1);
	document.cookie = encodeURIComponent(name) + "=; expires=" + d;
}

// // 弹出层封装
// function alertLayer(msg){
// 	$(".alert_label_detail").text(msg);
// 	$(".full_page").css("display","block");
// 	$(".alert_palyer").css("display","block");
// 	$(".detail_right_video").css('display','none');
// }


// // 关闭alert弹层
// function closeAlert(){
//     $(".alert_label_detail").text(" ");
//     $(".full_page").css("display","none");
//     $(".alert_palyer").css("display","none");
//     if($(".list_container").css("display") == "block" || $(".full_page_div2").css("display") == "block" || $(".warning_palyer").css("display") == "block" || $(".full_page_div").css("display") == "block"){

//     }else{
//         $(".detail_right_video").css('display','block');
//         updateVideo();
//     }
// }

// function choseMeetYx(num){
//     if(num == "0"){
//         $("input[name='meet_yx']").eq(1).attr("checked",false);
//         $("input[name='meet_yx']").eq(0).attr("checked",true);
//     }else if(num == "1"){
//         $("input[name='meet_yx']").eq(0).attr("checked",false);
//         $("input[name='meet_yx']").eq(1).attr("checked",true);
//     }
//     //alert($("input[name='meet_yx']:checked").val())
// }




	$(".menu_left_ul li").click(function(){
		$(this).addClass("onmenu");
		$(this).siblings().removeClass("onmenu");
	});
	$(".full_page_header .name_del").mouseover(function(){
		$(this).addClass("ondel");
	}).mouseout(function(){
		$(this).removeClass("ondel");
	}).mouseup(function(){
		$(this).addClass("ondel");
		$(".full_page").css({"display":"none"});
		$(".full_page_div").css({"display":"none"});
		// libraryObj.delLibVideo();
	});
	
	$(".full_page_cancle").mouseover(function(){
		$(this).addClass("oncancle");
		$(".full_page_submit").addClass("onsubmit");
	}).mouseout(function(){
		$(this).removeClass("oncancle");
		$(".full_page_submit").removeClass("onsubmit");
	}).mouseup(function(){
		$(this).addClass("oncancle");
		$(".full_page_submit").addClass("onsubmit");
		$(".full_page").css({"display":"none"});
		$(".full_page_div").css({"display":"none"});
		// libraryObj.delLibVideo();
	});
	$(".full_page_cancle2").mouseover(function(){
		$(this).addClass("oncancle");
		$(".full_page_submit2").addClass("onsubmit");
	}).mouseout(function(){
		$(this).removeClass("oncancle");
		$(".full_page_submit2").removeClass("onsubmit");
	}).mouseup(function(){
	});
	$(".player_page_cancle").mouseover(function(){
		$(this).addClass("oncancle");
		$(".player_page_submit").addClass("onsubmit");
	}).mouseout(function(){
		$(this).removeClass("oncancle");
		$(".player_page_submit").removeClass("onsubmit");
	}).mouseup(function(){
		$(this).addClass("oncancle");
		$(".player_page_submit").addClass("onsubmit");
		$(".full_page").css({"display":"none"});
		$(".warning_palyer").css({"display":"none"});
	});
	$("#recordWH").change(function () {  
        var ss = $(this).children('option:selected').val();  
        if (ss == "1") {  
        	$("#bitRate").val("350");

        }else if (ss == "2") {  
        	$("#bitRate").val("500");

        }else if (ss == "3") {
        	$("#bitRate").val("1000");

        }else if (ss == "4") { 
        	$("#bitRate").val("2000");

        }else if (ss == "5") { 
        	$("#bitRate").val("500");

        }
    }); 
    $("#frameRate").on("blur",function(){
	    var v = parseInt($(this).val());
	    if(v > 20){
	        $(this).val(20);
	    }else if(v < 6){
	    	 $(this).val(6);
	    }
	}); 
	$("#frame_input").on("blur",function(){
	    var v = parseInt($(this).val());
	    if(v > 20){
	        $(this).val(20);
	    }else if(v < 6){
	    	 $(this).val(6);
	    }
	});
	// radio 在选择时的变化
	$("input[name='recDataType']").click(function(){
		// 如果没被选中，则设置为选中，同时相邻的元素设置为未选中
		$(this).siblings("input[name='recDataType']").attr("checked",false);
		$(this).attr("checked",true);
	});
	$("input[name='recUpType']").click(function(){
		// 如果没被选中，则设置为选中，同时相邻的元素设置为未选中
		$(this).siblings("input[name='recUpType']").attr("checked",false);
		$(this).attr("checked",true);
	});



function fullPageSub(){
	if(0){
		$(".full_page").css({"display":"none"});
		$(".full_page_div").css({"display":"none"});
	}
}
function closePage1(){
	$(".full_page").css("display","none");
	$(".full_page_div").css("display","none");
}
function fullPageCal1(){
	$(".full_page").css("display","none");
	$(".full_page_div").css("display","none");
}
function closePage2(){
	$(".full_page").css("display","none");
	$(".full_page_div2").css("display","none");
	$(".full_page_div4").css({"display":"none"});
	//$(".full_page_msg2").css('display','block');
}
function minPage2(){
	$(".full_page").css("display","none");
	$(".full_page_div2").css("display","none");
	$(".full_page_div4").css({"display":"none"});
	$(".full_page_msg2").css('display','block');
}
//点击录像设置  视频设置
$(".full_page_tab span").map(function(index){
	$(this).click(function(){
		changeTab(index+1)
	})
})
function changeTab(index){
	if(index == 1){
		$("#full_page_msg2").css("display","none");
		$("#full_page_div4").css("display","block");
		$("#tab1").addClass("ontab");
		$("#tab2").removeClass("ontab");
	}else{
		$("#full_page_msg2").css("display","block");
		$("#full_page_div4").css("display","none");
		$("#tab1").removeClass("ontab");
		$("#tab2").addClass("ontab");
	}
}
function closePlayer(){
	$(".full_page").css("display","none");
	$(".warning_palyer").css("display","none");
	if(g_uploading == false)
	{
		if($(".list_container").css("display") == "block" || $(".full_page_div2").css("display") == "block" || $(".full_page_div").css("display") == "block"){
			
		}else{
			$(".detail_right_video").css('display','block');
			updateVideo();
		}
	}
}

}






