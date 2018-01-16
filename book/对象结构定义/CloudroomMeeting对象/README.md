# <font color="#2674ba">CloudroomMeeting对象</font>

>CloudroomMeeting是核心控件，实现登录、队列、呼叫、通话建立、音频采集播入、视频采集编解码、屏幕共享、录制、影音播放等；

<!--  -->
## <font color="#0099cc">获取sdk的版本信息</font>

<p style="background:#f7f7f7;color:#718c00">string Version</p>

- **功能**:获取sdk的版本信息

- **返回值**:无

- **参数**:无

>可读

<!--  -->
## <font color="#0099cc">SDK初始化</font>

<p style="background:#f7f7f7;color:#718c00">SDK初始化</p>

- **功能**:SDK初始化

- **返回值**:CRMEETSDK_NOERR为成功，否则是失败代码

- **参数**:
 + oemid向云屋申请的开发商ID
 + sdkFilePath sdk配置、临时文件存放位置，可为空

>每次init后，都应对一次uninit
