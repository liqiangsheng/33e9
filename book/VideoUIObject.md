# <font color="#2674ba">VideoUI对象</font>

>VideoUI是视频显示控件，它显示设定的用户的视频;

<!-- 1 -->
### <font color="#0099cc">设置显示的目标用户视频</font>

<p style="background:#f7f7f7;color:#718c00">方法  setVideo  ()</p>

>void setVideo(string userID, long videoID=<font face="微软雅黑">-1</font>)

- **功能**:设置显示的目标用户视频

- **返回值**:无

- **参数**:
 + userID ------ 目标用户ID
 + videoID ------ 用户的指定视频设备（<font face="微软雅黑">-1</font>，代表用户的默认视频设备）

<!-- 2 -->
### <font color="#0099cc">获取当前显示的用户</font>

<p style="background:#f7f7f7;color:#718c00">方法  getUserID  ()</p>

>string getUserID()

- **功能**:获取当前显示的用户

- **返回值**:用户ID

- **参数**:无

<!-- 3 -->
### <font color="#0099cc">获取当前显示的用户的视频设备</font>

<p style="background:#f7f7f7;color:#718c00">方法  getVideoID  ()</p>

>string getVideoID()

- **功能**:获取当前显示的用户的视频设备

- **返回值**:用户ID

- **参数**:无

<!-- 4 -->
### <font color="#0099cc">拍照</font>

<p style="background:#f7f7f7;color:#718c00">方法  savePic  ()</p>

>long savePic(string pathFileName)

- **功能**:拍照

- **返回值**:<font face="微软雅黑">0:成功； 非0：保存遇到的错误码；</font>

- **参数**:无

<!-- 5 -->
### <font color="#0099cc">清空缓存的图像</font>

<p style="background:#f7f7f7;color:#718c00">方法  clear  ()</p>

>void clear()

- **功能**:清空缓存的图像

- **返回值**:无

- **参数**:无

<!-- 6 -->
### <font color="#0099cc">检查图像是否为空</font>

<p style="background:#f7f7f7;color:#718c00"> 属性isPicEmpty </p>

>Long isPicEmpty

- **功能**:检查图像是否为空

- **返回值**:无

- **参数**:无

>可读.<font face="微软雅黑">0: 有图像， 1:无图像</font>