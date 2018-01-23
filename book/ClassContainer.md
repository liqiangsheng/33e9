# 容器类 {#ClassContainer}

- #####[显示容器的基类 ](#container)
- #####[影音播放的呈现容器](#MediaContainer)
- #####[屏幕共享播放的呈现容器](#ScreenShareContainer)
- #####[视频的呈现容器](#VideoContainer)

### CRVideo.Container {#Container}

>new Container() <font color="red">显示容器的基类</font>

### Methods

- handler() <font color="red">object对象</font> 
- height() <font color="red">容器的高度</font>
- id() <font color="red">id</font>
- style() <font color="red">容器的样式</font>
- width() <font color="red">容器的宽度</font>

### CRVideo.MediaContainer {#MediaContainer}

>new MediaContainer() <font color="red">影音播放的呈现容器</font>

### Methods

- disableToolBar(bDisable) <font color="red">工具条是否可用</font>

参数   |类型  |说明
-------|----------|---------
 bDisable|	number|	0:可用; 非0:不可用;

- handler() <font color="red">object对象</font>
   + **继承**:[CRVideo.Container](#Container).handler()

- height() <font color="red">容器的高度</font>
   + **继承**:[CRVideo.Container](#Container).height()

- id() <font color="red">id</font>
   + **继承**:[CRVideo.Container](#Container).id()

- keepAspectRatio(value) <font color="red">绘制模式，是否拉伸绘制</font>

参数   |类型  |说明
-------|----------|---------
 value|	bool|	true: 保持比例不拉伸， false:不保持比例进行拉伸

- savePicToBase64(format) <font color="red">保存播放影音画面到图片文件</font>

**返回值**:Base64字符串 (string)

参数   |类型  |说明
-------|----------|---------
 format|	string|	支持格式:bmp, png, gif, jpg, jpeg

- savePicToFile(pathFileName) <font color="red">保存播放影音画面到图片文件</font>

**返回值**:0成功，非0失败 (number)

参数   |类型  |说明
-------|----------|---------
 pathFileName|	string|	本地绝对路径文件名(支持格式：bmp, png, gif, jpg, jpeg)

- setToolBarUIElementVisible(UIElement, isVisible) <font color="red">显示隐藏播放工具条上的界面元素</font>

**返回值**:无

参数   |类型  |说明
-------|----------|---------
UIElement|	CRVideo_ToolBarUI	|界面元素
isVisible	|bool	|是否可见

- style() <font color="red">容器的样式</font>
   + **继承**:[CRVideo.Container](#Container).style()

- width() <font color="red">容器的宽度</font>
   + **继承**:[CRVideo.Container](#Container).width()

### CRVideo.ScreenShareContainer {#ScreenShareContainer}

>new ScreenShareContainer() <font color="red">屏幕共享播放的呈现容器</font>

### Methods

- clear() <font color="red">清空缓存的图像</font>

- ctrlOpen(value) <font color="red">开启控制模式</font>

**返回值**:无

参数   |类型  |说明
-------|----------|---------
 value|	bool|	true: 开启， false:不开启

- enableMarked(value) <font color="red">开启标注模式</font>

**返回值**:无

参数   |类型  |说明
-------|----------|---------
 value|	bool|	0: 不开启, 1:开启

- isPicEmpty(num) <font color="red">检查图像是否为空</font>

**返回值**:无

参数   |类型  |说明
-------|----------|---------
 value|	bool|	0: 有图像, 1:无图像

- keepAspectRatio(num) <font color="red">绘制模式，是否拉伸绘制</font>

**返回值**:无

参数   |类型  |说明
-------|----------|---------
 value|	bool|	true: 保持比例不拉伸， false:不保持比例进行拉伸

- savePic(pathFileName) <font color="red">拍照</font>

**返回值**:0:成功； 非0：保存遇到的错误码(bool)

参数   |类型  |说明
-------|----------|---------
 pathFileName|	string|	本地绝对路径文件名(支持格式：bmp, png, gif, jpg, jpeg)

- setPenStyle(intRgba：, penWidth) <font color="red">设置标注画笔样式</font>

**返回值**:无

参数   |类型  |说明
-------|----------|---------
 intRgba：	|num|	颜色，排列方式bgr(8:8:8)
penWidth|	num	|画笔宽度

### CRVideo.VideoContainer {#VideoContainer}

>new VideoContainer() <font color="red">视频的呈现容器</font>

> **继承**[CRVideo.Container](#Container)

### Methods

- clear() <font color="red">清理当前图像</font>

- getVideoID() <font color="red">获取当前显示的用户的视频设备</font>

**返回值**:视频ID (string)

- getVisibleNickName() <font color="red">获取是否显示昵称</font>

**返回值**:否显示昵称 (bool)

- handler() <font color="red">object对象</font>
   + **继承**:[CRVideo.Container](#Container).handler()

- height() <font color="red">容器的高度</font>
   + **继承**:[CRVideo.Container](#Container).height()

- id() <font color="red">id</font>
   + **继承**:[CRVideo.Container](#Container).id()

- isPicEmpty() <font color="red">检查图像是否为空</font>

**返回值**:图像是否为空 (bool)

- keepAspectRatio(value) <font color="red">设置显示的视频画面是否保持比例</font>

参数   |类型  |说明
-------|----------|---------
value|	bool|	true: 保持比例不拉伸， false:不保持比例进行拉伸

- savePic(pathFileName) <font color="red">拍照</font>

**返回值**:0:成功； 非0：保存遇到的错误码 (bool)

参数   |类型  |说明
-------|----------|---------
pathFileName|	string|	本地绝对路径文件名(支持格式：bmp, png, gif, jpg, jpeg)

- savePicToBase64(format) <font color="red">拍照</font>

**返回值**:Base64为图片数据字符串，不成功则为空 (string)

参数   |类型  |说明
-------|----------|---------
format|	string|	图片格式，支持bmp, png, gif, jpg, jpeg

- setVideo(userID, videoID) <font color="red">设置显示的目标用户视频</font>

**返回值**:无

参数   |类型  |说明
-------|----------|---------
userID	|string	|目标用户ID
videoID	|number|	用户的指定视频设备（-1，代表用户的默认视频设备）

- setVisibleNickName(value) <font color="red">设置是否显示昵称</font>

**返回值**:无

参数   |类型  |说明
-------|----------|---------
value	|bool	|否显示昵称

- visibleNickName(value) <font color="red">检查昵称是否可见</font>

**返回值**:无

参数   |类型  |说明
-------|----------|---------
value	|bool	|0: 可见， 1:不可见

- style() <font color="red">容器的样式</font>
   + **继承**:[CRVideo.Container](#Container).style()

- width() <font color="red">容器的宽度</font>
   + **继承**:[CRVideo.Container](#Container).width()







 
