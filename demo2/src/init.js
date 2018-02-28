
if(window["000a0180686911e78dd0a45d36bb8c5c"] === undefined)
{
    /**
	 * 录制布局
	 * @enum { number }
	 */
	CRVideo_ToolBarUI = 
	{
		/**暂停播放按钮*/
		BTN_Pause:0,
		/**停止播放按钮*/
		BTN_STOP:1
	}

	/**
	 * 云屋web直播sdk
	 * @version 1.3.0
	 */
	var CRVideo = function () 
		{
			var win = window,
				doc = document,
				nav = navigator,

				w3cdom = typeof doc.getElementById !== "undefined" && typeof doc.getElementsByTagName !== "undefined" && typeof doc.createElement !== "undefined",
				u = nav.userAgent.toLowerCase(),
				p = nav.platform.toLowerCase(),
				windows = p ? /win/.test(p) : /win/.test(u),
				mac = p ? /mac/.test(p) : /mac/.test(u),
				webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
				ff =u.indexOf("firefox")>-1?true:false;//是否是火狐
				ie = nav.appName === "Microsoft Internet Explorer";

				var agent = navigator.userAgent.toLowerCase();
				var regStr_ie = /msie ([\d.])+/gi;
				if(ie)
				{
						var vArrStr = agent.match(regStr_ie)[0];
						var v = vArrStr.split(' ')[1]
				}
			return {"w3": w3cdom, "wk": webkit, "ie": ie,"ff":ff, "win": windows, "mac": mac,"v":v};
		}()
	CRVideo.addEventListener = function(target,name,fun)
	{
		if (target.addEventListener) {                    //所有主流浏览器，除了 IE 8 及更早 IE版本
		    target.addEventListener(name, fun);
		} else if (target.attachEvent) {                  // IE 8 及更早 IE 版本
		    target.attachEvent("on"+name, fun);
		};
	}
	CRVideo.scroll = function()
	{
		var timeOutHandler = -1
		CRVideo.addEventListener(window,"scroll",function(){
				clearTimeout(timeOutHandler)
			   timeOutHandler = setTimeout(function()
			   {
					var div = document.createElement('div')
					var objects=document.getElementsByTagName("object");
					for(var i = 0;i < CRVideo._containerList.length;i++)
					// for(var i in CRVideo._containerList)
					{
						var container = CRVideo._containerList[i]
						var node = container.handler()
						if(node && node.parentNode)
						{
							var parent = node.parentNode
							if(parent.lastChild == node)
							{
								parent.removeChild(node)
								parent.appendChild(node)	
							}else
							{
								var index = Array.from(parent.childNodes).indexOf(node)
								parent.removeChild(node)
								parent.insertBefore(node,parent.childNodes[index])
							}
						}
						if(container instanceof  CRVideo.VideoContainer)
						{
							if(typeof(node.setVideo) == "function")
							{
								node.setVideo(container._usrID,container._videoID);
							}
							if(typeof(node.setVisibleNickName) == "function")
							{
								node.setVisibleNickName(container._visibleNickName);
							}
						}
					}

			   },200)
            }) 
		return 0
	}()
	/**
	 * @class
	 */
	CRVideo.CbProxy = function(name)
	{
		this.name = name;
		this.callback = null;
	}
    /** 
    * 显示容器的基类 
    * @class
    */
	CRVideo.Container = function()
	{
		
	}

    /**
	 * object对象
	 */	
	CRVideo.Container.prototype.handler = function(value)
	{
		if(value === undefined)
		{
			return this._handler;
		}else
		{
			this._handler = value;
		}
	}
     /**
	 * id
	 */	
	CRVideo.Container.prototype.id = function(value)
	{
		if(value === undefined)
		{
			return this._handler.id;
			this.__addCallBack();
		}else
		{
			this._handler.id = value;
		}
		
	}

	CRVideo.Container.prototype.__addCallBack = function()
	{

	}
     /**
	 * 容器的宽度
	 */	
	CRVideo.Container.prototype.width = function(value)
	{
		if(value === undefined)
		{
			return parseint(this._handler.style.width);
		}else
		{
			this._handler.style.width = value+"px";
		}
		
	}
     /**
	 * 容器的高度
	 */	
	CRVideo.Container.prototype.height = function(value)
	{
		if(value === undefined)
		{
			return parseint(this._handler.style.height);
		}else
		{
			this._handler.style.height = value+"px";
		}
		
	}
     /**
	 * 容器的样式
	 */	
	CRVideo.Container.prototype.style = function(key,value)
	{
		this._handler.style.display = "none";
		if(key === undefined)
		{
			return this._handler.style;
		}else
		{
			if(value === undefined)
			{
				return this._handler.style[key];
			}else
			{
				this._handler.style[key] = value;
			}
		}
	}
	// Carter修改的******************************************************************

	/**
	 * 容器的左边距离
	 */	
	CRVideo.Container.prototype.left = function(value)
	{
		if(value === undefined)
		{
			return parseint(this._handler.style.left);
		}else
		{
			this._handler.style.left = value+"px";
		}
		
	}

	/**
	 * 容器的顶边距离
	 */	
	CRVideo.Container.prototype.top = function(value)
	{
		if(value === undefined)
		{
			return parseint(this._handler.style.top);
		}else
		{
			this._handler.style.top = value+"px";
		}
		
	}

	/**
	 * 容器的显示
	 */	
	CRVideo.Container.prototype.hidden = function()
	{	
		this._handler.style.display = "none";	
	}

	/**
	 * 容器的消失
	 */	
	CRVideo.Container.prototype.shows = function()
	{
		this._handler.style.display = "block";
		
	}
	//**********************************************************
	CRVideo._containerList = [];
    /**
     * 影音播放的呈现容器
     * @class
     * @extends CRVideo.Container
     */
	CRVideo.MediaContainer = function()
	{
		CRVideo._containerList.push(this)
	}
	CRVideo.MediaContainer.prototype = new CRVideo.Container()

	CRVideo.MediaContainer.prototype.__addCallBack = function()
	{

	}
	 /**
	 * 保存播放影音画面到图片文件
     * @param {string} pathFileName - 本地绝对路径文件名(支持格式：bmp, png, gif, jpg, jpeg)
     * @return {number} 0成功，非0失败
	 */	
	CRVideo.MediaContainer.prototype.savePicToFile = function(pathFileName)
	{
		return this._handler.savePicToFile(pathFileName);
	}
	/**
	 * 保存播放影音画面到图片文件
     * @param {string} format - 支持格式:bmp, png, gif, jpg, jpeg
     * @return {string} Base64字符串
	 */	
	CRVideo.MediaContainer.prototype.savePicToBase64 = function(format)
	{
		return this._handler.savePicToBase64(format);
	}
	/**
	 * 截图拍照
	 * @access public
     * @param {string} format - 图片格式，支持bmp, png, gif, jpg, jpeg
     * @return {string} 图片数据的safe array，不成功返0长度的array
	 */	
	CRVideo.MediaContainer.prototype.savePicToArray = function(format)
	{
		return this._handler.savePicToArray(format);
	}
	/**
	 * 获取图像时间戳
	 * @access public
     * @param {string} format - 图片格式，支持bmp, png, gif, jpg, jpeg
     * @return {boolen} 当前图像数据对应的时间戳
	 */	
	CRVideo.MediaContainer.prototype.getPicFrameTime = function()
	{
		return this._handler.getPicFrameTime();
	}
	 /**
	 * 显示隐藏播放工具条上的界面元素
	 * @access public
	 * @param {CRVideo_ToolBarUI} UIElement  -  界面元素
     * @param {bool } isVisible   -  是否可见
	 */	
    CRVideo.MediaContainer.prototype.setToolBarUIElementVisible = function(UIElement,isVisible)
	{
        this._handler.setToolBarUIElementVisible(UIElement,isVisible);
	}  
	 /**
	 * 绘制模式，是否拉伸绘制
     * @param {bool} value - true: 保持比例不拉伸， false:不保持比例进行拉伸
	 */	
    CRVideo.MediaContainer.prototype.keepAspectRatio = function(value)
	{
        if(value === undefined)
        {
            return this._handler.keepAspectRatio;
        }else
        {
            this._handler.keepAspectRatio = value;
        }
	}  
     /**
	 * 工具条是否可用
     * @param {number} bDisable -  0:可用; 非0:不可用;
	 */	
	CRVideo.MediaContainer.prototype.disableToolBar  = function(disable)
	{
		this._handler.disableToolBar(disable);
	}

    /**
     * 视频的呈现容器
     * @class
     * @extends CRVideo.Container
     */
	CRVideo.VideoContainer = function()
	{
		this._videoID = -1;
		this._usrID = "";
		this._visibleNickName = true;
		CRVideo._containerList.push(this)
	}
	CRVideo.VideoContainer.prototype = new CRVideo.Container()
    /**
	 * 设置显示的目标用户视频
	 * @access public
	 * @param {string} userID - 目标用户ID
     * @param {number } videoID - 用户的指定视频设备（-1，代表用户的默认视频设备）
	 */	
	CRVideo.VideoContainer.prototype.setVideo = function(usrID,videoID)
	{
		if(videoID == undefined)
		{
			videoID = -1
		}
		this._usrID = usrID;
		this._videoID = videoID;
		this._handler.setVideo(usrID,videoID);
	}
	/**
	 * 获取当前显示的用户
	 * @access public
	 * @return {string} 用户ID
	 */	
	CRVideo.VideoContainer.prototype.getUserID = function()
	{
		return this._handler.getUserID();
	}
    /**
	 * 获取当前显示的用户的视频设备
	 * @access public
	 * @return {string} 视频ID
	 */	
	CRVideo.VideoContainer.prototype.getVideoID = function()
	{
		return this._handler.getVideoID();
	}
	/**
	 * 拍照
	 * @access public
     * @param {string} pathFileName - 本地绝对路径文件名(支持格式：bmp, png, gif, jpg, jpeg)
     * @return {bool} 0:成功； 非0：保存遇到的错误码；
	 */	
	CRVideo.VideoContainer.prototype.savePic = function(pathFileName)
	{
		return this._handler.savePic(pathFileName);
	}
    /**
	 * 拍照
	 * @access public
     * @param {string} format - 图片格式，支持bmp, png, gif, jpg, jpeg
     * @return {string} Base64为图片数据字符串，不成功则为空
	 */	
	CRVideo.VideoContainer.prototype.savePicToBase64 = function(format)
	{
		return this._handler.savePicToBase64(format);
	}
	/**
	 * 截图拍照
	 * @access public
     * @param {string} format - 图片格式，支持bmp, png, gif, jpg, jpeg
     * @return {string} 图片数据的safe array，不成功返0长度的array
	 */	
	CRVideo.VideoContainer.prototype.savePicToArray = function(format)
	{
		return this._handler.savePicToArray(format);
	}
	/**
	 * 获取图像时间戳
	 * @access public
     * @param {string} format - 图片格式，支持bmp, png, gif, jpg, jpeg
     * @return {boolen} 当前图像数据对应的时间戳
	 */	
	CRVideo.VideoContainer.prototype.getPicFrameTime = function()
	{
		return this._handler.getPicFrameTime();
	}
    /**
	 * 清理当前图像
	 * @access public
	 */	
	CRVideo.VideoContainer.prototype.clear = function()
	{
		return this._handler.clear();
	}
	 /**
	 * 设置显示的视频画面是否保持比例
     * @param {bool} value - true: 保持比例不拉伸， false:不保持比例进行拉伸
	 */	
    CRVideo.VideoContainer.prototype.keepAspectRatio = function(value)
	{
        if(value === undefined)
        {
            return this._handler.keepAspectRatio;
        }else
        {
            this._handler.keepAspectRatio = value;
        }
	}
	/**
	 * 检查昵称是否可见
     * @param {bool} value - 0: 可见， 1:不可见
	 */	
    CRVideo.VideoContainer.prototype.visibleNickName = function(value)
	{
        if(value === undefined)
        {
            return this._handler.visibleNickName;
        }else
        {
            this._handler.visibleNickName = value;
        }
	}
     /**
	 * 设置是否显示昵称
	 * @access public
     * @param {bool} value - 否显示昵称
	 */	
	CRVideo.VideoContainer.prototype.setVisibleNickName = function(value)
	{
		this._visibleNickName = value
		this._handler.visibleNickName = value;
	}
    /**
	 * 获取是否显示昵称
	 * @access public
     * @return {bool} 否显示昵称
	 */	
	CRVideo.VideoContainer.prototype.getVisibleNickName = function()
	{
		return this._handler.visibleNickName;
	}
     /**
	 * 检查图像是否为空
     * @return {bool} 图像是否为空
	 */	
	CRVideo.VideoContainer.prototype.isPicEmpty = function()
	{
		return this._handler.isPicEmpty;
	}
	/**
	 * 屏幕共享播放的呈现容器
	 * @class
	 * @extends CRVideo.ScreenShareContainer
	 */
	CRVideo.ScreenShareContainer = function()
	{
		CRVideo._containerList.push(this)
	}
	CRVideo.ScreenShareContainer.prototype = new CRVideo.Container()

	CRVideo.ScreenShareContainer.prototype.__addCallBack = function()
	{

	}
	/**
	 * 拍照
	 * @access public
	 * @param {string} pathFileName - 本地绝对路径文件名(支持格式：bmp, png, gif, jpg, jpeg)
	 * @return {bool} 0:成功； 非0：保存遇到的错误码；
	 */	
	CRVideo.ScreenShareContainer.prototype.savePic  = function(pathFileName)
	{
		return this._handler.savePic(pathFileName);
	}
	/**
	 * 拍照
	 * @access public
     * @param {string} format - 图片格式，支持bmp, png, gif, jpg, jpeg
     * @return {string} 以base64编码的图片数据，不成功返回空
	 */	
	CRVideo.ScreenShareContainer.prototype.savePicToBase64 = function(format)
	{
		return this._handler.savePicToBase64(format);
	}
	/**
	 * 截图拍照
	 * @access public
     * @param {string} format - 图片格式，支持bmp, png, gif, jpg, jpeg
     * @return {string} 图片数据的safe array，不成功返0长度的array
	 */	
	CRVideo.ScreenShareContainer.prototype.savePicToArray = function(format)
	{
		return this._handler.savePicToArray(format);
	}
	/**
	 * 获取图像时间戳
	 * @access public
     * @param {string} format - 图片格式，支持bmp, png, gif, jpg, jpeg
     * @return {boolen} 当前图像数据对应的时间戳
	 */	
	CRVideo.ScreenShareContainer.prototype.getPicFrameTime = function()
	{
		return this._handler.getPicFrameTime();
	}
	 /**
	 * 清空缓存的图像
	 */	
	CRVideo.ScreenShareContainer.prototype.clear = function()
	{
		return this._handler.clear();
	}
	/**
	 * 检查图像是否为空
	 * @param {string} num - 0: 有图像, 1:无图像
	 */	
	CRVideo.ScreenShareContainer.prototype.isPicEmpty = function(num)
	{
		return  this._handler.isPicEmpty(num);
	}
	/**
	 * 开启标注模式
	 * @param {string} value - 0: 不开启, 1:开启
	 */	
	CRVideo.ScreenShareContainer.prototype.enableMarked = function(value)
	{
		 if(value === undefined)
	    {
	        return this._handler.enableMarked;
	    }else
	    {
	        this._handler.enableMarked = value;
	    }
	}
	/**
	 * 设置标注画笔样式
	 * @param {num} intRgba： - 颜色，排列方式bgr(8:8:8)
	 * @param {num} penWidth - 画笔宽度
	 */	
	CRVideo.ScreenShareContainer.prototype.setPenStyle = function(intRgba,penWidth)
	{
		
	    return this._handler.setPenStyle(intRgba,penWidth);
	}
	 /**
	 * 绘制模式，是否拉伸绘制
	 * @param {bool} value - true: 保持比例不拉伸， false:不保持比例进行拉伸
	 */	
	CRVideo.ScreenShareContainer.prototype.keepAspectRatio = function(value)
	{
	    if(value === undefined)
	    {
	        return this._handler.keepAspectRatio;
	    }else
	    {
	        this._handler.keepAspectRatio = value;
	    }
	}
	/**
	 * 开启控制模式
	 * @param {bool} value - true: 开启， false:不开启
	 */	
	CRVideo.ScreenShareContainer.prototype.ctrlOpen = function(value)
	{
	    if(value === undefined)
	    {
	        return this._handler.ctrlOpen;
	    }else
	    {
	        this._handler.ctrlOpen = value;
	    }
	}  
}

