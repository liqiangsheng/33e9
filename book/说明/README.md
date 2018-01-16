# <font color="#2674ba">云屋视频SDK参考</font>

<p style="background:#f7f7f7;font-size:14px;height:50px;line-height:50px;"><font face="微软雅黑">此版本适合v3.1版本的SDK</font></p>

<p style="width:100%;height:4px;background:#f7f7f7;"></p>

## <font color="#0099cc">说明</font>

>会议SDK结构、SDK开发流程、SDK浏览器开发环境

#### <font color="#0099cc">sdk说明</font>


> - doc<font color="#f77a0b">(文档说明文件夹）</font>
   + fonts
   + scripts
   + styles
   + callback.js.html
   + CloudroomVideoSDK for Web开发指南.docx<font color="#f77a0b">（web端开发指南）</font>
   + CRMeet.CbProxy.html
   + CRVideo.CbProxy.html
   + CRVideo.Container.html
   + CRVideo.MediaContainer.html
   + CRVideo.ScreenShareContainer.html
   + CRVideo.VideoContainer.html
   + error.js.html
   + global.html
   + index.html<font color="#f77a0b">（入口文件）</font>
   + init.js.html
   + live.js.html
   + module-cr_callback.html
   + module-cr_error.html

> - examples<font color="#f77a0b">(四个demo案例文件夹)</font>
   + Meeting(web)<font color="#f77a0b">（会议demo）</font>
   + RecordDemo(web)<font color="#f77a0b">（本地双录demo）</font>
   + RemoteRecordDemo(web)<font color="#f77a0b">（远程双录demo）</font>
   + VideoCall(web)<font color="#f77a0b">（视频会议demo）</font>

> - js
   + CloudroomVideoSDK.js<font color="#f77a0b">（js sdk文件）</font>
   + CloudroomVideoSDK.min.js<font color="#f77a0b">（js sdk压缩文件）</font>
   + CloudroomVideoSDK_iePatch.js<font color="#f77a0b">（ie8专用js sdk文件）</font>

> - CloudroomVideoSDK.exe<font color="#f77a0b">（客户端插件）</font>

> - history.txt<font color="#f77a0b">（历史版本文件）</font>

> - readme.txt<font color="#f77a0b">（readme文件</font>

## <font color="#0099cc">开发准备</font>

<p style="width:100%;background:#f7f7f7;">JavaScript 的开发工具有很多，开发者可根据自己的喜好进行选择。在此，我们推荐开发者使用<font color="#718c00"> dreamwaver</font> 作为自己的开发工具，本套开发指南也是针对<font color="#718c00"> dreamwaver </font>开发环境下进行编写的。</p>

#### <font color="#0099cc">安装插件</font>

- 首先要安装开发插件，CloudroomVideo SDK for Web 提供的所有 JavaScript 接口都是基于这个插件实现，进行web开发之前需要确保插件已经安装成功，双击SDK目录下的开发环境下进行编写的。