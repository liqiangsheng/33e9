<!-- 视频显示 -->
# <font color="#2674ba">CloudroomVideoUI对象</font> {#videoui}

>CloudroomVideoUI是视频显示控件，它显示设定的用户的视频

<!-- 1 -->
### <font color="#0099cc">设置显示的目标用户视频</font>

<p style="background:#f7f7f7;color:#718c00">方法 setVideo （）</p>

>void setVideo(string userID, int videoID)

- **功能**:设置显示的目标用户视频

- **返回值**:无

- **参数**:
 + userID ----- 目标用户ID
 + videoID ----- 目标用户ID

<!-- 2 -->
### <font color="#0099cc">获取当前显示的用户</font>

<p style="background:#f7f7f7;color:#718c00">方法 getUserID ()</p>

>string getUserID()

- **功能**:获取当前显示的用户

- **返回值**:用户ID

- **参数**:无

<!-- 3 -->
### <font color="#0099cc">获取当前显示的用户的视频设备</font>

<p style="background:#f7f7f7;color:#718c00">方法 getVideoID ()</p>

>string getVideoID() 

- **功能**:获取当前显示的用户的视频设备

- **返回值**:用户ID

- **参数**:无

<!-- 4 -->
### <font color="#0099cc">拍照</font>

<p style="background:#f7f7f7;color:#718c00">方法 savePic ()</p>

>long savePic(string pathFileName)

- **功能**:拍照

- **返回值**:0:成功； 非0：保存遇到的错误码；

- **参数**:
 + pathFileName ----- 保存为本地路径文件名

<!-- 5 -->
### <font color="#0099cc">拍照</font>

<p style="background:#f7f7f7;color:#718c00">方法 savePicToBase64 ()</p>

>string savePicToBase64(string format);

- **功能**:拍照

- **返回值**:Base64为图片数据字符串，不成功则为空

- **参数**:图片格式，支持bmp, png, gif, jpg, jpeg

<!-- 6 -->
### <font color="#0099cc">清空缓存的图像</font>

<p style="background:#f7f7f7;color:#718c00">方法 clear ()</p>

>void clear()

- **功能**:清空缓存的图像

- **返回值**:无

- **参数**:无

<!-- 7 -->
### <font color="#0099cc">设置显示的视频画面是否保持比例</font>

<p style="background:#f7f7f7;color:#718c00">属性keepAspectRatio</p>

>bool keepAspectRatio

- **功能**:设置显示的视频画面是否保持比例

- **参数**:无

>可读写。true: 保持比例不拉伸， false:不保持比例进行拉伸

<!-- 8 -->
### <font color="#0099cc">检查昵称是否可见</font>

<p style="background:#f7f7f7;color:#718c00">属性visibleNickName</p>

>int visibleNickName

- **功能**:检查昵称是否可见

- **参数**:无

>可读写。0: 可见， 1:不可见

<!-- 9 -->
### <font color="#0099cc">检查图像是否为空</font>

<p style="background:#f7f7f7;color:#718c00">属性isPicEmpty</p>

>int isPicEmpty

- **功能**:检查图像是否为空

- **参数**:无

>可读。0: 有图像， 1:无图像