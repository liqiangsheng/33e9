# <font color="#2674ba">IDArray对象</font>

>CLSID:{3EF6CA8A-3C5D-4353-92B5-CE0EC5157BA6}

>Long类型数据列表

<!-- 1 -->
### <font color="#0099cc">控制功能是否开启</font>

<p style="background:#f7f7f7;color:#718c00">属性ctrlOpen</p>

>bool ctrlOpen

- **功能**:控制功能是否开启

- **返回值**:无

- **参数**:无

>可读、可写.true: 开启， false:关闭

<!-- 2 -->
### <font color="#0099cc">从IDArray中获取某个ID</font>

<p style="background:#f7f7f7;color:#718c00">方法  item ()</p>

>long item(long index)

- **功能**:从IDArray中获取某个ID

- **返回值**:数组中的第index个ID

- **参数**:
 + index ------ 第几个对象； index=0代表取第一个对象

<!-- 3 -->
### <font color="#0099cc">清空数据</font>

<p style="background:#f7f7f7;color:#718c00">方法  clear ()</p>

>Void clear()

- **功能**:清空数据

- **返回值**:无

- **参数**:无

<!-- 4 -->
### <font color="#0099cc">追加一个ID到数组未尾</font>

<p style="background:#f7f7f7;color:#718c00">方法  append ()</p>

>Void append(Long ID)

- **功能**:追加一个ID到数组未尾

- **返回值**:无

- **参数**:无

# <font color="#2674ba">StrArray对象</font>

>CLSID:{E592EF62-3258-4442-AB51-2DC17FD883DE}

>字符串列表

<!-- 1 -->
### <font color="#0099cc">string个数</font>

<p style="background:#f7f7f7;color:#718c00">属性count</p>

>long count

- **功能**:string个数

- **返回值**:无

- **参数**:无

>可读.

<!-- 2 -->
### <font color="#0099cc">从StrArray中获取某个string</font>

<p style="background:#f7f7f7;color:#718c00">方法 item ()</p>

>string item(long index)

- **功能**:从StrArray中获取某个string

- **返回值**:数组中的第index个字符串

- **参数**:
 + index ------ 第几个对象； index=0代表取第一个对象

 <!-- 3 -->
### <font color="#0099cc">清空数据</font>

<p style="background:#f7f7f7;color:#718c00">方法  clear ()</p>

>Void clear()

- **功能**:清空数据

- **返回值**:无

- **参数**:无

<!-- 4 -->
### <font color="#0099cc">追加一个ID到数组未尾</font>

<p style="background:#f7f7f7;color:#718c00">方法  append ()</p>

>Void append(string str)

- **功能**:追加一个string到数组未尾

- **返回值**:无

- **参数**:无

# <font color="#2674ba">OleSize对象</font>

>CLSID:{4147F4EB-C2B5-4a88-9ACF-F64FE8A0E172}

<!-- 1 -->
### <font color="#0099cc">宽度</font>

<p style="background:#f7f7f7;color:#718c00">属性width</p>

>long width

- **功能**:宽度

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 2 -->
### <font color="#0099cc">高度</font>

<p style="background:#f7f7f7;color:#718c00">属性height</p>

>long height

- **功能**:高度

- **返回值**:无

- **参数**:无

>可读、可写

# <font color="#2674ba">OleRect对象</font>

>CLSID:{E03B03B1-6F85-421b-87FF-73381CA9A007}

<!-- 1 -->
### <font color="#0099cc">矩型区域左边</font>

<p style="background:#f7f7f7;color:#718c00">属性left</p>

>long left

- **功能**:矩型区域左边

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 2 -->
### <font color="#0099cc">矩型区域顶边</font>

<p style="background:#f7f7f7;color:#718c00">属性top</p>

>long top

- **功能**:矩型区域顶边

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 3 -->
### <font color="#0099cc">矩型区域右边</font>

<p style="background:#f7f7f7;color:#718c00">属性right</p>

>long right

- **功能**:矩型区域右边

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 4 -->
### <font color="#0099cc">矩型区域底部</font>

<p style="background:#f7f7f7;color:#718c00">属性bottom</p>

>long bottom

- **功能**:矩型区域底部

- **返回值**:无

- **参数**:无

>可读、可写

# <font color="#2674ba">MembersInfo对象</font>

>CLSID:{BF151791-69A2-4187-AFD0-AFDA7F8E2500}

>MembersInfo是视频设备列表对象；

<!-- 1 -->
### <font color="#0099cc">MemberInfo对象个数</font>

<p style="background:#f7f7f7;color:#718c00">属性count</p>

>long count

- **功能**:MemberInfo对象个数

- **返回值**:无

- **参数**:无

>可读

<!-- 2 -->
### <font color="#0099cc">从MembersInfo中获取某个MemberInfo对象</font>

<p style="background:#f7f7f7;color:#718c00">属性item</p>

>MemberInfo item(long index)

- **功能**:从MembersInfo中获取某个MemberInfo对象

- **返回值**:无

- **参数**:
 + index ------ 第几个对象； index=0代表取第一个对象

>可读

# <font color="#2674ba">MemberInfo对象</font>

>CLSID:{7BE4EC79-4867-40fa-9DC5-6459E06C46CA}

>MemberInfo是单个用户的信息；

<!-- 1 -->
### <font color="#0099cc">用户ID</font>

<p style="background:#f7f7f7;color:#718c00">属性userID</p>

>string userID

- **功能**:用户ID

- **返回值**:无

- **参数**:无

>可读

<!-- 2 -->
### <font color="#0099cc">设备名称</font>

<p style="background:#f7f7f7;color:#718c00">属性nickName</p>

>string nickName

- **功能**:设备名称

- **返回值**:无

- **参数**:无

>可读

<!-- 3 -->
### <font color="#0099cc">音频状态</font>

<p style="background:#f7f7f7;color:#718c00">属性audioStatus</p>

>string audioStatus

- **功能**:音频状态

- **返回值**:无

- **参数**:无

>可读

<!-- 4 -->
### <font color="#0099cc">视频状态</font>

<p style="background:#f7f7f7;color:#718c00">属性videoStatus</p>

>string videoStatus

- **功能**:视频状态

- **返回值**:无

- **参数**:无

>可读

# <font color="#2674ba">QueuesInfo对象</font>

>CLSID:{545DB358-7079-4317-A337-D230F6D34D63}

>QueuesInfo是队列信息列表对象

<!-- 1 -->
### <font color="#0099cc">QueueInfo对象个数</font>

<p style="background:#f7f7f7;color:#718c00">属性count</p>

>long count

- **功能**:QueueInfo对象个数

- **返回值**:无

- **参数**:无

>可读

<!-- 2 -->
### <font color="#0099cc">从QueuesInfo中获取某个QueueInfo对象</font>

<p style="background:#f7f7f7;color:#718c00">属性item</p>

>QueueInfo item(long index)

- **功能**:从QueuesInfo中获取某个QueueInfo对象

- **返回值**:无

- **参数**:
 + index ------ 第几个对象； index=0代表取第一个对象

>可读

# <font color="#2674ba">QueueInfo对象</font>

>CLSID:{3559F857-6E28-4da5-B61B-F654B56CF575}

>QueueInfo是队列信息对象

<!-- 1 -->
### <font color="#0099cc">队列ID</font>

<p style="background:#f7f7f7;color:#718c00">属性queID</p>

>long queID

- **功能**:队列ID

- **返回值**:无

- **参数**:无

>可读. queID具有唯一性，但不一定从0开始编码，也不一定连续；

<!-- 2 -->
### <font color="#0099cc">队列名称</font>

<p style="background:#f7f7f7;color:#718c00">属性name</p>

>string name

- **功能**:队列名称

- **返回值**:无

- **参数**:无

>可读

<!-- 3 -->
### <font color="#0099cc">队列描述</font>

<p style="background:#f7f7f7;color:#718c00">属性desc</p>

>string desc

- **功能**:队列描述

- **返回值**:无

- **参数**:无

>可读

<!-- 4 -->
### <font color="#0099cc">队列描述</font>

<p style="background:#f7f7f7;color:#718c00">属性prio</p>

>long prio

- **功能**:队列描述

- **返回值**:无

- **参数**:无

>可读.值越小优先级越高

# <font color="#2674ba">QueueStatus对象</font>

>CLSID:{55EAB554-8AF1-41d1-90A7-871FAAFB023D}

>QueueStatus是队列状态对象

<!-- 1 -->
### <font color="#0099cc">队列ID</font>

<p style="background:#f7f7f7;color:#718c00">属性queID</p>

>long queID

- **功能**:队列ID

- **返回值**:无

- **参数**:无

>可读. queID具有唯一性，但不一定从0开始编码，也不一定连续；

<!-- 2 -->
### <font color="#0099cc">排队客户数量</font>

<p style="background:#f7f7f7;color:#718c00">属性wait_num</p>

>long wait_num

- **功能**:排队客户数量

- **返回值**:无

- **参数**:无

>可读

<!-- 3 -->
### <font color="#0099cc">坐席数量</font>

<p style="background:#f7f7f7;color:#718c00">属性agent_num</p>

>long agent_num

- **功能**:坐席数量

- **返回值**:无

- **参数**:无

>可读

<!-- 4 -->
### <font color="#0099cc">正在服务的客户数量</font>

<p style="background:#f7f7f7;color:#718c00">属性srv_num</p>

>long srv_num

- **功能**:正在服务的客户数量

- **返回值**:无

- **参数**:无

>可读.值越小优先级越高

# <font color="#2674ba">QueuingInfo对象</font>

>CLSID:{6887CB72-6705-4c22-969A-DDC322876A6C}

>QueuingInfo是排队信息对象

<!-- 1 -->
### <font color="#0099cc">获取队列ID</font>

<p style="background:#f7f7f7;color:#718c00">属性queID</p>

>long queID

- **功能**:获取队列ID

- **返回值**:无

- **参数**:无

>可读. -1:代表我当前没有排队；

<!-- 2 -->
### <font color="#0099cc">我在队列中的位置</font>

<p style="background:#f7f7f7;color:#718c00">属性position</p>

>long position

- **功能**:我在队列中的位置

- **返回值**:无

- **参数**:无

>可读.1：代表我排在队首，下一个就是我

<!-- 3 -->
### <font color="#0099cc">排队时间</font>

<p style="background:#f7f7f7;color:#718c00">属性queuingTime</p>

>long queuingTime

- **功能**:排队时间

- **返回值**:无

- **参数**:无

>可读

# <font color="#2674ba">VideoSessionInfo对象</font>

>CLSID:{C272C7A4-099D-40e5-A619-3C09EAA070D0}

>VideoSessionInfo是视频会话信息对象

<!-- 1 -->
### <font color="#0099cc">会话的呼叫ID</font>

<p style="background:#f7f7f7;color:#718c00">属性callID</p>

>string callID

- **功能**:会话的呼叫ID

- **返回值**:无

- **参数**:无

>可读.callID为空：代表还没有会话，此对象其它数据都无效

<!-- 2 -->
### <font color="#0099cc">会话的目标用户ID</font>

<p style="background:#f7f7f7;color:#718c00">属性peerID</p>

>string peerID

- **功能**:会话的目标用户ID

- **返回值**:无

- **参数**:无

>可读.1：代表我排在队首，下一个就是我

<!-- 3 -->
### <font color="#0099cc">会话的目标用户昵称</font>

<p style="background:#f7f7f7;color:#718c00">属性peerName</p>

>string peerName

- **功能**:会话的目标用户昵称

- **返回值**:无

- **参数**:无

>可读

<!-- 4 -->
### <font color="#0099cc">呼叫是否被对方接受</font>

<p style="background:#f7f7f7;color:#718c00">属性bCallAccepted</p>

>long bCallAccepted

- **功能**:呼叫是否被对方接受

- **返回值**:无

- **参数**:无

>可读.0：暂未接受， 1：已接受

<!-- 5 -->
### <font color="#0099cc">呼叫接受后，分配的会议ID</font>

<p style="background:#f7f7f7;color:#718c00">属性meetingID</p>

>long meetingID

- **功能**:呼叫接受后，分配的会议ID

- **返回值**:无

- **参数**:无

>可读

<!-- 6 -->
### <font color="#0099cc">会议密码</font>

<p style="background:#f7f7f7;color:#718c00">属性meetingPswd</p>

>long meetingPswd

- **功能**:会议密码

- **返回值**:无

- **参数**:无

>可读

<!-- 7 -->
### <font color="#0099cc">会议持续的时长</font>

<p style="background:#f7f7f7;color:#718c00">属性duration</p>

>long duration

- **功能**:会议持续的时长

- **返回值**:无

- **参数**:无

>可读

# <font color="#2674ba">ScreenShareCfg对象</font>

>CLSID:{856E6983-5FB7-4602-A15A-35FD619A00D2}

>屏幕共享配置

<!-- 1 -->
### <font color="#0099cc">编码类型</font>

<p style="background:#f7f7f7;color:#718c00">属性encodeType</p>

>long encodeType

- **功能**:编码类型

- **返回值**:无

- **参数**:无

>可读、可写.数值参见屏幕共享的编码类型ENCODE_TYPE

<!-- 2 -->
### <font color="#0099cc">共享多区域</font>

<p style="background:#f7f7f7;color:#718c00">属性catchRect</p>

>OleRect catchRect

- **功能**:共享多区域

- **返回值**:无

- **参数**:无

>可读、可写.参见对象OleRect

<!-- 3 -->
### <font color="#0099cc">共享指定的窗口</font>

<p style="background:#f7f7f7;color:#718c00">属性catchWnd</p>

>long catchWnd

- **功能**:共享指定的窗口

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 4 -->
### <font color="#0099cc">最大帧率</font>

<p style="background:#f7f7f7;color:#718c00">属性maxFPS</p>

>long maxFPS

- **功能**:最大帧率

- **返回值**:无

- **参数**:无

>可读、可写.缺省为8

<!-- 5 -->
### <font color="#0099cc">最大码率</font>

<p style="background:#f7f7f7;color:#718c00">属性maxKbps</p>

>long maxKbps

- **功能**:最大码率

- **返回值**:无

- **参数**:无

>可读、可写.缺省800kbps

# <font color="#2674ba">UserVideosInfo对象</font>

>CLSID:{8165DE21-D6B8-449a-AED0-AAC0468B0E1B}

>UserVideosInfo是用户摄像头信息列表对象

<!-- 1 -->
### <font color="#0099cc">UserVideoInfo对象个数</font>

<p style="background:#f7f7f7;color:#718c00">属性count</p>

>long count

- **功能**:UserVideoInfo对象个数

- **返回值**:无

- **参数**:无

>可读

<!-- 2 -->
### <font color="#0099cc">从UserVideosInfo中获取某个UserVideoInfo对象</font>

<p style="background:#f7f7f7;color:#718c00">属性item</p>

>UserVideoInfo item(long index)

- **功能**:从UserVideosInfo中获取某个UserVideoInfo 对象

- **返回值**:无

- **参数**:
 + index：第几个对象； index=0代表取第一个对象

>可读

# <font color="#2674ba">UserInfo对象</font>

>CLSID:{9D016D85-CDE6-4beb-B49C-159DD9C4F6FD}

>排队的用户信息

<!-- 1 -->
### <font color="#0099cc">队列ID</font>

<p style="background:#f7f7f7;color:#718c00">属性queID</p>

>long queID

- **功能**:队列ID

- **返回值**:无

- **参数**:无

>可读

<!-- 2 -->
### <font color="#0099cc">用户ID</font>

<p style="background:#f7f7f7;color:#718c00">属性usrID</p>

>string usrID

- **功能**:用户ID

- **返回值**:无

- **参数**:无

>可读

<!-- 3 -->
### <font color="#0099cc">用户昵称</font>

<p style="background:#f7f7f7;color:#718c00">属性name</p>

>string name

- **功能**:用户昵称

- **返回值**:无

- **参数**:无

>可读

<!-- 4 -->
### <font color="#0099cc">用户呼叫时的私有数据</font>

<p style="background:#f7f7f7;color:#718c00">属性param</p>

>string param

- **功能**:用户呼叫时的私有数据

- **返回值**:无

- **参数**:无

>可读.用户在 call时携带的param参数

# <font color="#2674ba">UserVideoInfo对象</font>

>CLSID:{68BBFAA9-B2D9-4873-9918-4FC10AD26C05}

>UserVideoInfo是用户摄像头信息

<!-- 1 -->
### <font color="#0099cc">用户ID</font>

<p style="background:#f7f7f7;color:#718c00">属性userID</p>

>string userID

- **功能**:用户ID

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 2 -->
### <font color="#0099cc">摄像头ID</font>

<p style="background:#f7f7f7;color:#718c00">属性videoID</p>

>long videoID

- **功能**:摄像头ID

- **返回值**:无

- **参数**:无

>可读、可写.videoID可不传，默认值为-1，代表用户的默认摄像头， sdk内部会正确做对应处理（即使中途用户的默认摄像头切换了）

<!-- 3 -->
### <font color="#0099cc">摄像头名称</font>

<p style="background:#f7f7f7;color:#718c00">属性videoName</p>

>string videoName

- **功能**:摄像头名称

- **返回值**:无

- **参数**:无

>可读、可写

# <font color="#2674ba">VideoIDArray对象</font>

>CLSID:{68FCDB8E-6B71-40C8-9893-3336C68F62B9}

>VideoIDArray是用户摄像头信息

<!-- 1 -->
### <font color="#0099cc">摄像头个数</font>

<p style="background:#f7f7f7;color:#718c00">属性count</p>

>long count

- **功能**:摄像头个数

- **返回值**:无

- **参数**:无

>可读

<!-- 2 -->
### <font color="#0099cc">从VideoIDArray中获取某个用户ID</font>

<p style="background:#f7f7f7;color:#718c00">方法 itemUserID ()</p>

>long itemUserID(long index)

- **功能**:从VideoIDArray中获取某个用户ID

- **返回值**:数组中的第index个用户ID

- **参数**:
 + index：第几个对象； index=0代表取第一个对象


<!-- 3 -->
### <font color="#0099cc">从VideoIDArray中获取摄像头ID</font>

<p style="background:#f7f7f7;color:#718c00">方法 itemVideoID ()</p>

>long itemVideoID(long index)

- **功能**:从VideoIDArray中获取摄像头ID

- **返回值**:数组中的第index个摄像头ID

- **参数**:
 + index：第几个对象； index=0代表取第一个对象

 <!-- 4 -->
### <font color="#0099cc">清空数据</font>

<p style="background:#f7f7f7;color:#718c00">方法 clear ()</p>

>Void clear()

- **功能**:清空数据

- **返回值**:无

- **参数**:无

 <!-- 5 -->
### <font color="#0099cc">追加一个ID到数组未尾</font>

<p style="background:#f7f7f7;color:#718c00">方法 append ()</p>

>Void append(string userID, long videoID=-1)

- **功能**:追加一个ID到数组未尾

- **返回值**:无

- **参数**:
 + userID ------ 用户ID
 + videoID ------ 摄像头ID

>videoID 取值-1时代表用户的默认摄像头

# <font color="#2674ba">RecordCFG对象</font>

>CLSID:{3F1802A6-DB14-4115-93AC-56FA567FF9F8}

>录像配置

<!-- 1 -->
### <font color="#0099cc">摄像头个数</font>

<p style="background:#f7f7f7;color:#718c00">属性filePathNamet</p>

>string filePathName

- **功能**:录像存储的路径文件名

- **返回值**:无

- **参数**:无

>可读、可写.使用完整路径

<!-- 2 -->
### <font color="#0099cc">录制语音类型</font>

<p style="background:#f7f7f7;color:#718c00">属性audioType</p>

>RECORD_AUDIO_TYPE audioType

- **功能**:录制语音类型

- **返回值**:无

- **参数**:无

>可读、可写


<!-- 3 -->
### <font color="#0099cc">录制结果中视频尺寸宽度</font>

<p style="background:#f7f7f7;color:#718c00">属性recordWidth</p>

>long recordWidth

- **功能**:录制结果中视频尺寸宽度

- **返回值**:无

- **参数**:无

>可读、可写

 <!-- 4 -->
### <font color="#0099cc">功能录制图像类型</font>

<p style="background:#f7f7f7;color:#718c00">属性videoType</p>

>RECORD_VIDEO_TYPE videoType

- **功能**:功能录制图像类型

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 5 -->
### <font color="#0099cc">录制结果中视频尺寸高度</font>

<p style="background:#f7f7f7;color:#718c00">属性recordHeight</p>

>long recordHeight

- **功能**:录制结果中视频尺寸高度

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 6 -->
### <font color="#0099cc">录制的帧率</font>

<p style="background:#f7f7f7;color:#718c00">属性frameRate</p>

>long frameRate

- **功能**:录制的帧率

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 7 -->
### <font color="#0099cc">录制的最高码率</font>

<p style="background:#f7f7f7;color:#718c00">属性bitRate</p>

>long bitRate

- **功能**:录制的最高码率

- **返回值**:无

- **参数**:无

>可读、可写.当图像变化小时，实际码率会低于此值.<font color="red">建议：<p>640*360: 500000; (500kbps)</p><p>1280*720：1000000; (1mbps)</p><p>1920*1080: 2000000; (2mbps)</p></font>

<!-- 7 -->
### <font color="#0099cc">录制的缺省质量</font>

<p style="background:#f7f7f7;color:#718c00">属性defaultQP</p>

>long defaultQP

- **功能**:录制的缺省质量

- **返回值**:无

- **参数**:无

>可读、可写.<p>缺省值：28</p><p>取值范围：0~51;  (0完全无损, 51质量非常差)</p><p>推荐：高质量取值18, 中质量28， 低质量38</p>

# <font color="#2674ba">RecVideos对象</font>

>CLSID:{A193C053-B5C3-4c95-A462-A47074DDFB88}

>录像配置

<!-- 1 -->
### <font color="#0099cc">视频布局类型</font>

<p style="background:#f7f7f7;color:#718c00">属性layoutType</p>

>RECORD_VLAYOUT layoutType

- **功能**:视频布局类型

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 2 -->
### <font color="#0099cc">录制的用户ID列表</font>

<p style="background:#f7f7f7;color:#718c00">属性userIDs</p>

>StrArray userIDs

- **功能**:录制的用户ID列表

- **返回值**:无

- **参数**:无

>可读、可写

# <font color="#2674ba">ByteArray对象</font>

>CLSID:{96222393-37B7-4FB1-8868-665563A1F198}

>数据数组

<!-- 1 -->
### <font color="#0099cc">数据长度，unsigned char的长度</font>

<p style="background:#f7f7f7;color:#718c00">属性length</p>

>long length

- **功能**:数据长度，unsigned char的长度

- **返回值**:无

- **参数**:无

>可读

<!-- 2 -->
### <font color="#0099cc">预设数组大小，提高效率</font>

<p style="background:#f7f7f7;color:#718c00">方法 reserve ()</p>

>string reserve(long size)

- **功能**:预设数组大小，提高效率

- **返回值**:无

- **参数**:
 + size ------ 数组大小

<!-- 3 -->
### <font color="#0099cc">从ByteArray 中获取某个unsigned char</font>

<p style="background:#f7f7f7;color:#718c00">方法 item ()</p>

>string item(long index)

- **功能**:从ByteArray 中获取某个unsigned char

- **返回值**:数组中的第index个unsigned char

- **参数**:
 + index ------ 第几个unsigned char； index=0代表取第一个unsigned char

<!-- 4 -->
### <font color="#0099cc">数组数据</font>

<p style="background:#f7f7f7;color:#718c00">属性safeArray</p>

>VARIANT arry

- **功能**:数组数据

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 5 -->
### <font color="#0099cc">追加一个unsigned char到数组未尾</font>

<p style="background:#f7f7f7;color:#718c00">方法 append ()</p>

>void append(unsigned char ch)

- **功能**:追加一个unsigned char到数组未尾

- **返回值**:无

- **参数**:无

<!-- 6 -->
### <font color="#0099cc">清空数据</font>

<p style="background:#f7f7f7;color:#718c00">方法 clear ()</p>

>void clear（）

- **功能**:清空数据

- **返回值**:无

- **参数**:无

# <font color="#2674ba">SubPage对象</font>

>CLSID:{54FA72A0-7F8C-403A-A337-E147C7F006B4}

>白板信息

<!-- 1 -->
### <font color="#0099cc">用户ID</font>

<p style="background:#f7f7f7;color:#718c00">属性userID</p>

>string userID

- **功能**:用户ID

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 2 -->
### <font color="#0099cc">白板ID</font>

<p style="background:#f7f7f7;color:#718c00">属性boardID</p>

>long boardID

- **功能**:白板ID

- **返回值**:无

- **参数**:无

>可读、可写

# <font color="#2674ba">SubPages对象</font>

>CLSID:{4C92ACF7-6BEC-49C4-BE79-89188741EAC8}

<!-- 1 -->
### <font color="#0099cc">追加一个子功能页面到数组未尾</font>

<p style="background:#f7f7f7;color:#718c00">方法 append ()</p>

>void append(SubPage board)

- **功能**:追加一个子功能页面到数组未尾

- **返回值**:无

- **参数**:
 + board ------ 一个子页（如白板），类型见SubPage定义

<!-- 2 -->
### <font color="#0099cc">从SubPages中获取某个SubPage</font>

<p style="background:#f7f7f7;color:#718c00">方法 item ()</p>

>SubPage item(long index)

- **功能**:从SubPages中获取某个SubPage

- **返回值**:数组中的第index个SubPage

- **参数**:
  + index ------ 第几个SubPage； index=0代表取第一个SubPage

<!-- 3 -->
### <font color="#0099cc">清空数据</font>

<p style="background:#f7f7f7;color:#718c00">方法 clear ()</p>

>void clear()

- **功能**:清空数据

- **返回值**:无

- **参数**:无

<!-- 4 -->
### <font color="#0099cc">子功能页个数</font>

<p style="background:#f7f7f7;color:#718c00">属性count</p>

>long count

- **功能**:子功能页个数

- **返回值**:无

- **参数**:无

>可读

# <font color="#2674ba">ElementID对象</font>

>CLSID:{93750E6D-4CF9-4FFD-9DFD-03997A444A52}

>图元信息

<!-- 1 -->
### <font color="#0099cc">用户ID</font>

<p style="background:#f7f7f7;color:#718c00">属性userID</p>

>string userID

- **功能**:用户ID

- **返回值**:无

- **参数**:无

>可读、可写

<!-- 2 -->
### <font color="#0099cc">白板ID</font>

<p style="background:#f7f7f7;color:#718c00">属性elementID</p>

>long elementID

- **功能**:图元ID

- **返回值**:无

- **参数**:无

>可读、可写

# <font color="#2674ba">ElementIDs对象</font>

>CLSID:{2FB7E75B-8E8C-4BC7-81C7-22E75E3F6C02}

>ElementIDs是图元信息列表对象

<!-- 1 -->
### <font color="#0099cc">追加一个ElementID 到数组未尾</font>

<p style="background:#f7f7f7;color:#718c00">方法 append ()</p>

>void append(ElementID newVal)

- **功能**:追加一个ElementID 到数组未尾

- **返回值**:无

- **参数**:
 + newVal ------ 参见对象ElementID 的定义

<!-- 2 -->
### <font color="#0099cc">清空数据</font>

<p style="background:#f7f7f7;color:#718c00">方法 clear ()</p>

>void clear()

- **功能**:清空数据

- **返回值**:无

- **参数**:无

# <font color="#2674ba">白板内图元类型对象定义</font>

><font color="red">图元数据，目前只支持铅笔和直线</font>

###### <font color="#F5871F">白板内数据组织方式</font>

|key|value|
|:--------|-------|
|功能 |组织一个白板内所有图元数据|
|格式 |Json|
|字段 |userID，data|
|说明 |data内含白板内所有的图元数据，以json节点数组的方式存储，每一个节点为一个图元数据|

### <font color="#0099cc">铅笔图元</font>

###### <font color="#F5871F">白板内铅笔图元数据字段定义数据组织方式</font>

|key|value|
|:--------|-------|
|userID |用户ID|
|elementID                                 |图元ID|
|orderId |序号，初始值为10000000，添加图元成功后从服务端返回新值|
|left |起点的x坐标|
|top |起点的y坐标|
|type |图元类型,铅笔为4|
|color |颜色，rgb数值，int型|
|pixel |图元像素大小，取值范围1，2，4，6|
|style |图元风格|
|dot |点坐标数组,每个数组元素为相对于（left, top）的坐标对值（x，y）|
|说明 |格式如下： {"userID": "testuser","elementID": 123,"orderId": 123, "left": 123, "top": 123, "type": 4, //PENCIL"color": 123,"width": 2, "style": 1, //SolidLine "dot": [{"x": 1,"y": 1}, {"x": 2,"y": 2 },{"x": 3, "y": 3},...... ]}|

### <font color="#0099cc">直线图元</font>

###### <font color="#F5871F">直线图元数据定义</font>

|key|value|
|:--------|-------|
|userID |用户ID|
|elementID |图元ID|
|orderId |序号，初始值为10000000，添加图元成功后从服务端返回新值|
|left |起点的x坐标|
|top |起点的y坐标|
|type |图元类型，直线为6|
|color |颜色，rgb值数组,[r,g,b]|
|pixel |图元像素大小，取值范围1，2，4，6|
|style |图元风格|
|line |直线起点（x1，y1）和终点（x2, y2）相对于(left, top)的坐标|
|说明 |格式如下：样式如下：{"userID": "testUser", "elementID": 12, "orderId": 123,"left": 34,"top": 43,"type": 6, //LINE"color": 123,"pixel": 2,"style": 1, //SolidLine  "line": {"x1": 1,"y1": 1, "x2": 100, "y2": 100 }}|
