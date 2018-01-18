<!-- 屏幕显示 -->
# <font color="#2674ba">CloudroomScreenShareUI对象</font>

>CloudroomScreenShareUI是远端屏幕显示控件

<!-- 1 -->
### <font color="#0099cc">拍照</font>

<p style="background:#f7f7f7;color:#718c00">方法 savePic （）</p>

>int savePic(string pathFileName)

- **功能**:拍照

- **返回值**:0:成功； 非0：保存遇到的错误码；

- **参数**:无

<!-- 2 -->
### <font color="#0099cc">清空缓存的图像</font>

<p style="background:#f7f7f7;color:#718c00">方法 clear ()</p>

>void clear()

- **功能**:清空缓存的图像

- **返回值**:无

- **参数**:无

<!-- 3 -->
### <font color="#0099cc">设置标注画笔样式</font>

<p style="background:#f7f7f7;color:#718c00">方法 setPenStyle ()</p>

>void setPenStyle(int intRgb, int penWidth)

- **功能**:设置标注画笔样式

- **返回值**:无

- **参数**:
 + intRgba ------ 颜色，排列方式bgr(8:8:8)
 + penWidth ------ 画笔宽度

<!-- 4 -->
### <font color="#0099cc">检查图像是否为空</font>

<p style="background:#f7f7f7;color:#718c00">属性isPicEmpty</p>

>int isPicEmpty

- **功能**:检查图像是否为空

- **参数**:无

>可读。0: 有图像, 1:无图像

<!--5 -->
### <font color="#0099cc">开启标注模式</font>

<p style="background:#f7f7f7;color:#718c00">属性enableMarked</p>

>bool enableMarked

- **功能**:开启标注模式

- **参数**:无

>读、写

<!-- 6 -->
### <font color="#0099cc">绘制模式，是否拉伸绘制</font>

<p style="background:#f7f7f7;color:#718c00">属性keepAspectRatio</p>

>bool keepAspectRatio

- **功能**:绘制模式，是否拉伸绘制

- **参数**:无

>读、写

<!-- 7 -->
### <font color="#0099cc">开启控制模式</font>

<p style="background:#f7f7f7;color:#718c00">属性ctrlOpen</p>

>int ctrlOpen

- **功能**:开启控制模式

- **参数**:无

>读、写
