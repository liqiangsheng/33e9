# <font color="#2674ba">对象结构定义</font> 

## <font color="#0099cc">会议对象</font> {#MeetInfoObj}

>MeetInfoObj

<p style="background:#f7f7f7;color:#718c00">
{"ID":<font color="#ef8020">100</font>,
"pswd":<font color="#ef8020">""</font>,
"subject":<font color="#ef8020">"test"</font>,
"pubMeetUrl":<font color="#ef8020">"www.cloudroom.com/auzjie"</font>,
 "creator":<font color="#ef8020">"testuser"</font>,
  "memberCount":<font color="#ef8020"4</font>}
  </p>
 
属性        | 值
--------    | ---
ID          |  会议号，0：代表会议信息无效
pswd        |  会议密码；（空代表会议无密码）
subject     |  会议主题
pubMeetUrl  |  会议公共链接
creator     |  会议创建者
memberCount |  会议内人数

## <font color="#0099cc">会议对象列表</font> {#MeetInfoObjs}

>MeetInfoObjs

<div style="background:#f7f7f7;color:#718c00">
  
[<p>{"ID":<font color="#ef8020">100</font>,
"pswd":<font color="#ef8020">""</font>,
"subject":<font color="#ef8020">"test"</font>,
"pubMeetUrl":<font color="#ef8020">"www.cloudroom.com/auzjie"</font>,
"creator":<font color="#ef8020">"testuser"</font>,
"memberCount":<font color="#ef8020">4</font>},</p>
<p>{"ID":<font color="#ef8020">100</font>,
"pswd":<font color="#ef8020">""</font>,
"subject":<font color="#ef8020">"test"</font>,
"pubMeetUrl":<font color="#ef8020" face=>"www.cloudroom.com/auzjie"</font>,
"creator":<font color="#ef8020">"testuser"</font>,
"memberCount":<font color="#ef8020">4</font>},... </p>]
</div>

## <font color="#0099cc">成员对象</font> {#MemberObj}

>MemberObj

<p style="background:#f7f7f7;color:#718c00">
{"userID":"<font color="#ef8020">111</font>",
"nickName":<font color="#ef8020">"aaa"</font>,
"audioStatus":"<font color="#ef8020">1</font>",
"videoStatus":"<font color="#ef8020">1</font>"}
</p>

属性            | 值
--------        | ---
userID          |  用户ID
nickName        |  用户昵称
audioStatus     |  音频状态,数值参考麦克风状态ASTATUS
videoStatus     |  视频状态,数值参考视频状态定义VSTATUS

## <font color="#0099cc">成员对象列表</font>  {#MembersObj}

>MembersObj

<p style="background:#f7f7f7;color:#718c00">

[{"userID":"<font color="#ef8020">111</font>","nickName":<font color="#ef8020">"aaa"</font>,"audioStatus":"<font color="#ef8020"1</font>","videoStatus":"<font color="#ef8020">1</font>"},

{"userID":"<font color="#ef8020">222</font>","nickName":<font color="#ef8020">"bbb"</font>,"audioStatus":"<font color="#ef8020">1</font>","videoStatus":"<font color="#ef8020">1</font>"}]

</p>

## <font color="#0099cc">音频配置</font>  {#AudioCfgObj}

>AudioCfgObj

<p style="background:#f7f7f7;color:#718c00">
{"micName": <font color="#ef8020">"aaa"</font>, 
"speakerName":<font color="#ef8020">"aaa"</font>, 
"privEC":"<font color="#ef8020">0</font>",
 "privAgc":"<font color="#ef8020">0</font>"}
</p>

属性            | 值
--------        | ---
micName          |  麦克风设备名称(空代表系统默认设备)
speakerName        |  扬声器名称(空代表系统默认设备)
privEC     |  是否开启云屋私有回声消息0：不开启；1：开启(缺省建议不开启)
privAgc     |  是否开启云屋私有语音自动增益0：不开启；1：开启(缺省建议不开启)

## <font color="#0099cc">视频配置</font> {#VideoCfgObj}

>VideoCfgObj

<p style="background:#f7f7f7;color:#718c00">
{"sizeType": <font color="#ef8020">1</font>,
 "fps":"<font color="#ef8020">12</font>"}
</p>

属性            | 值
--------        | ---
sizeType          |  视频尺寸，请参见：VIDEO_SHOW_SIZE
fps        |  帧率：视频帧率(5~30)
maxbps     |  视频码率（1~100*1000*1000）;(未配置则使用内部默认值，请参见VIDEO_SHOW_SIZE)
qp_min     |  最佳质量(18~51, 越小质量越好) (未配置则使用内部默认值25)
qp_max     |  最差质量(18~51, 越大质量越差) (未配置则使用内部默认值36)
wh_rate    | 视频宽高比,取值如下:<font color="#ef8020"> 0 为16:9(未配置时内部默认值);</font><font color="red"><p>1 为4:3;</p></font><font color="blueviolet"><p>2 为1:1;</p></font>


>我们采用的是vbr编码（由质量+码率，双重控制）：
>- qp范围：质量参数，为的是达到目标质量后，无需花费更大码率提高质量；
>- maxbps码率控制，是为了确保结果一定不大于“目标码率”（体积受控）；
>- 当要超出码率控制时，自动降低质量；当质量达到目标时，自动减少码率甚至无码率输出。

## <font color="#0099cc">视频帧图像 </font> {#VideoImgObj}

>VideoImgObj

<p style="background:#f7f7f7;color:#718c00">

{ "format":<font color="#ef8020">1</font>,
 "dat":<font color="#ef8020" >"FKLEOFJXKFD…"</font>,
 "width":<font color="#ef8020" >1024</font>, 
 "height":<font color="#ef8020" >768</font>, 
 "frameTime":<font color="#ef8020">100</font>}

</p>

属性            | 值
--------        | ---
format          |  图像格式,数值参考视频图像格式VIDEO_FORMAT
dat        |  图像数据Base64编码
width     |  图像宽度
height     |  图像高度
frameTime     |  图像的时戳

##<font color="#0099cc">用户视频信息 </font> {#VideoInfoObj}

>VideoInfoObj 

<p style="background:#f7f7f7;color:#718c00">
{"userID":<font color="#ef8020" >"111"</font>,
"videoID":<font color="#ef8020" >2</font>,
"videoName":<font color="#ef8020">"camera2"</font>}
</p>

属性            | 值
--------        | ---
userID          |  用户id
videoID       |  设备id
videoName     |  设备名称

##<font color="#0099cc">用户视频信息列表</font>

>VideoInfosObj {#VideoInfosObj}

<p style="background:#f7f7f7;color:#718c00">
[
{"userID":<font color="#ef8020">"111"</font>,"videoID":<font color="#ef8020">1</font>,"videoName":<font color="#ef8020">"camera1"</font>},

{"userID":<font color="#ef8020" >"111"</font>,"videoID":<font color="#ef8020">2</font>,"videoName":<font color="#ef8020" >"camera2"</font>},...

]
</p>

##<font color="#0099cc">用户视频列表</font> {#VideoIDObjs}

>VideoIDObjs

<p style="background:#f7f7f7;color:#718c00">
[
{"userID":<font color="#ef8020" >"111"</font>,"videoID":<font color="#ef8020">1</font>},

{"userID":<font color="#ef8020" >"111"</font>,"videoID":<font color="#ef8020">2</font>},...

]
</p>

属性            | 值
--------        | ---
userID          |  用户id
videoID       |  设备id

##<font color="#0099cc">屏幕共享配置</font> {#ScreenShareCfgObj}

>ScreenShareCfgObj

<p style="background:#f7f7f7;color:#718c00">
{"encodeType":<font color="#ef8020">0</font>,
  "maxFPS":<font color="#ef8020">8</font>,
  "maxKbps":<font color="#ef8020">800000 </font>}
</p>

属性            | 值
--------        | ---
encodeType          |  编码类型,详见屏幕共享的编码类型ENCODE_TYPE
catchRect       |  {"left":10,"top":10,"width":100,"height":100}用于实现区域共享
catchWnd       |  共享窗口的窗口句柄，用于实现窗口共享
maxFPS       |  最大帧率, 缺省为8 (当网络发不动时，帧率会自动下降)
maxKbps       | 最大帧率, 缺省为8 (当网络发不动时，帧率会自动下降)

##<font color="#0099cc">录制视频对象列表</font> {#RecordVideosObj}

>RecordVideosObj

<p style="background:#f7f7f7;color:#718c00">
[
{"left":<font color="#ef8020">426</font>,
"top":<font color="#ef8020">124</font>,
"width":<font color="#ef8020">409</font>,
"height":<font color="#ef8020">231</font>,
"type":<font color="#ef8020">0</font>,
 "keepAspectRatio":<font color="#ef8020">1</font>,
 "param":<font color="#ef8020"> {"camid":"c90d98e2-e50d-4abe-a318-104271a47cb6.1"}</font>},
…
]
</p>

属性            | 值
--------        | ---
left，top，width，height          |  在录制中的区域（相对于录像尺寸）
type         |  录制类型REC_VCONTENT_TYPE说明:<p>当type=RECVTP_VIDEO时，表示录制的是摄像头区域，param必需包含:</p><p>camid："用户id.摄像头id"</p><p>当type=RECVTP_PIC时，表示指定的图片，param 必须包含:</p><p>resourceid: xxx; (参见setPicResource)</p><p>当type=RECVTP_SCREEN时，表示录制的是屏幕，可以增加附加参数:</p><p>screenid：屏幕序号（-1:表示主屏）;</p><p>pid：进程号; (0：未指定进程)</p><p>area：x,y,w,h;（抓屏区域，无此参数时，代表抓全屏）</p><p>当type= RECVTP_TIMESTAMP时，不用附加任何参数</p>
keepAspectRatio         |  内容保持原始比例；（0：不保持；1：保持）
param         |  具体值与type相关；

##<font color="#0099cc">录制文件配置 </font> {#RecordCfgObj}

>RecordCfgObj 

<p style="background:#f7f7f7;color:#718c00">
{"filePathName":<font color="#ef8020">"D:\\1.mp4"</font>,
"recordWidth":<font color="#ef8020">640</font>,
"recordHeight":<font color="#ef8020">320</font>,
"frameRate":<font color="#ef8020">8</font>,
 "bitRate":<font color="#ef8020">500000</font>,
 "defaultQP":<font color="#ef8020">28</font>,
 "recDataType":<font color="#ef8020">1</font>,
 "isUploadOnRecording":<font color="#ef8020">0</font>}
</p>

属性            | 值
--------        | ---
filePathName          |  录像存储的路径文件名,使用完整路径
recordWidth       |  录制结果中视频尺寸宽度
recordHeight       |  录制结果中视频尺寸高度
frameRate       |  录制的帧率，取值范围:1-30(值越大,cpu要求更高，推荐15帧)
bitRate       | 录制的最高码率<p>当图像变化小时，实际码率会低于此值。建议:</p><p>640*360: 500000; (500kbps)</p><p>1280*720：1000000; (1mbps)</p><p>1920*1080: 2000000; (2mbps)</p>
defaultQP       |  <p>录制的缺省质量，缺省值：28</p><p>取值范围：0~51;  (0完全无损, 51质量非常差)</p><p>推荐：高质量取值18, 中质量28， 低质量36</p>
recDataType       |  录制内容类型，值参考定义REC_DATATYPE
isUploadOnRecording       | 是否边录边上传，0：手动上传；1：边录制边上传；

##<font color="#0099cc">录制文件列表 </font> {#RecordFilesObj}

>RecordFilesObj 

<p style="background:#f7f7f7;color:#718c00">
[
{"fileName":<font color="#ef8020" >"D:\\1.mp4"</font>,"size":<font color="#ef8020">10240</font>,"state":<font color="#ef8020">1</font>,"uploadPercent":<font color="#ef8020">100</font>},

{"fileName":<font color="#ef8020">"D:\\2.mp4"</font>,"size":<font color="#ef8020">13140</font>,"state":<font color="#ef8020" >2</font>,"uploadPercent":<font color="#ef8020">80</font>},
...
]
</p>

属性            | 值
--------        | ---
fileName          |  文件名，全路径
size       |  文件大小 
state       |  0:没有上传，1:上传中，2:上传完毕
uploadPercent       |  录制结果中视频尺寸高度上传进度，state为1时此字段有效

##<font color="#0099cc">影音文件</font> {#MediaInfoObj}

>MediaInfoObj

<p style="background:#f7f7f7;color:#718c00">
{ "userID":<font color="#ef8020"> "111"</font>, "state":<font color="#ef8020">1</font>, mediaName:<font color="#ef8020">"D:\1.mp4"</font>}
</p>

属性            | 值
--------        | ---
userID          |  用户id径
state       |   播放状态 0:播放 1:暂停 2:未播放
mediaName       |  影音文件名

##<font color="#0099cc">图片资源</font> {#PicResourceObj}

>PicResourceObj

<p style="background:#f7f7f7;color:#718c00">
{"fmt":<font color="#ef8020" >"picfile"</font>,"dat":<font color="#ef8020">"c:\test.jpg"</font>}
</p>

属性            | 值
--------        | ---
fmt          |  资源格式，可取值："yuv420p"，"rgb32"，"picfile"，"picdat"
dat       |   <p>资源数据，不同格式时，要提供的数据各不一样：</p><p>fmt为"yuv420p"时： dat存放的是base64(yuv420p数据)；</p><p>fmt为"rgb32"时： dat存放的是base64(rgb32数据)；</p><p>fmt为"picfile"时： dat存放的是“本地文件名”；</p><p>fmt为"picdat "时：dat存放的是base64(图片文件内容)；</p>
width          |  图像宽度(像素), 在fmt为"yuv420p"，"rgb32"时，需要此参数
height          |  图像高度(像素), 在fmt为"yuv420p"，"rgb32"时，需要此参数

##<font color="#0099cc">白板信息列表</font> {#BoardObjs}

>BoardObjs

<div style="background:#f7f7f7;color:#718c00">
[
<p>{ "boardID":<font color="#ef8020"> "a"</font>,"title":<font color="#ef8020"> "board"</font>,"width":<font color="#ef8020"> 1024</font>,"height": <font color="#ef8020">768</font>,"pageCount":<font color="#ef8020"> 1</font>},</p>
<p>{ "boardID": <font color="#ef8020">"b"</font>,"title": <font color="#ef8020">"board"</font>,"width": <font color="#ef8020">1024</font>,"height": <font color="#ef8020">768</font>,"pageCount":<font color="#ef8020"> 1</font>},</p>
…
]
</div>

##<font color="#0099cc">白板配置对象</font> {#BoardObj}

>BoardObj

<p style="background:#f7f7f7;color:#718c00">
{ "boardID":<font color="#ef8020"> "x"</font>,
"title": <font color="#ef8020">"board"</font>,
"width":<font color="#ef8020"> 1024</font>,
"height":<font color="#ef8020"> 768</font>,
"pageCount":<font color="#ef8020"> 1</font>}
</p>

属性            | 值
--------        | ---
boardID         |  白板标识
title      |   白板的名字
width、height      |  白板的宽、高
pageCount    |  页数(建议白板是一页，文档是实际页面数)

##<font color="#0099cc">白板图元列表</font> {#BoardElementObjs}

>BoardElementObjs

<p style="background:#f7f7f7;color:#718c00">
[
{ "elementID": <font color="#ef8020">"xx"</font>, "type":<font color="#ef8020">100</font>, "orderID":<font color="#ef8020">0</font>, "left":<font color="#ef8020">0</font>, "top":<font color="#ef8020">0, …</font>}
{ "elementID":<font color="#ef8020"> "yy"</font>, "type":<font color="#ef8020">100</font>, "orderID":<font color="#ef8020">0</font>, "left":<font color="#ef8020">100</font>, "top":<font color="#ef8020">100, …</font>}
]
</p>

##<font color="#0099cc">白板图元</font> {#BoardElementObj}

>BoardElementObj

<p style="background:#f7f7f7;color:#718c00">
{ "elementID": <font color="#ef8020">"xx"</font>,
 "type":<font color="#ef8020">100</font>,
  "left":<font color="#ef8020">0</font>,
  "top":<font color="#ef8020">0, …</font>}
</p>

属性            | 值
--------        | ---
elementID         |  图元id
type      |   图元的类型，值100以下为云屋保留值，100及以上为自定义值
left、top     |  图元在页内的左上角位置
…    |  可自由扩展
说明：    | <p>1.elementID必须调用createElementID（）获取, 即使是曾经调此接口创建的然后存入了磁盘文件，再次读入会议时，所有elementID也需要重新生重。</p><p>2.如果要和云屋产品互通，那就需要按云屋的定义取值，可以联系云屋获取相关文档</p>

##<font color="#0099cc">网盘文件对象</font> {#NetFileObj}

>NetFileObj

<p style="background:#f7f7f7;color:#718c00">
{"ownerID":<font color="#ef8020">""</font>,
"ownerName":<font color="#ef8020">""</font>,
"name":<font color="#ef8020">""</font>,
"orgFileName":<font color="#ef8020">""</font>,
"md5":<font color="#ef8020">""</font>,
"ctime":<font color="#ef8020">""</font>,
"size":<font color="#ef8020">""</font>,
"orgSize":<font color="#ef8020">""</font>,
"status":<font color="#ef8020">""</font>}
</p>

属性            | 值
--------        | ---
ownerID         |  文件所有者的ID
ownerName         |  文件所有者的名称
name         |  文件所有者的名称
orgFileName         |  用户的原始文件名
md5         |  压缩后的md5(如果不压缩，则原文件md5)
ctime         |  上传时间
size         |  在服务器上的大小
orgSize         |  原始文件大小
status         |  文件状态

##<font color="#0099cc">网盘文件对象列表</font> {#NetFileObjs}

>NetFileObjs

<div style="background:#f7f7f7;color:#718c00">
[<p>{"ownerID":<font color="#ef8020">""</font>,
"ownerName":<font color="#ef8020">""</font>,
"name":<font color="#ef8020">""</font>,
"orgFileName":<font color="#ef8020">""</font>,
"md5":<font color="#ef8020">""</font>,
"ctime":<font color="#ef8020">""</font>,
"size":<font color="#ef8020">""</font>,
"orgSize":<font color="#ef8020">""</font>,
"status":<font color="#ef8020">""</font>},</p>
<p>{"ownerID":<font color="#ef8020">""</font>,
"ownerName":<font color="#ef8020">""</font>,
"name":<font color="#ef8020">""</font>,
"orgFileName":<font color="#ef8020">""</font>,
"md5":<font color="#ef8020">""</font>,
"ctime":<font color="#ef8020">""</font>,
"size":<font color="#ef8020">""</font>,
"orgSize":<font color="#ef8020">""</font>,
"status":<font color="#ef8020">""</font>}</p>]
</div>