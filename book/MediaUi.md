<!-- 影音显示 -->
# <font color="#2674ba">CloudroomMediaUI对象</font>

>CloudroomMediaUI是影音显示控件

<!-- 1 -->
### <font color="#0099cc">保存播放影音画面到图片文件</font> {#savePicToFile}

<p style="background:#f7f7f7;color:#718c00">方法 savePicToFile （）</p>

>int savePicToFile(string pathFileName);

- **功能**:保存播放影音画面到图片文件

- **返回值**:0成功，非0失败

- **参数**:
 + pathFileName ------ 本地绝对路径文件名

>支持格式：bmp, png, gif, jpg, jpeg

<!-- 2 -->
### <font color="#0099cc">保存播放截图为base64数据字符串</font> {#savePicToBase64}

<p style="background:#f7f7f7;color:#718c00">方法 savePicToBase64 ()</p>

>string savePicToBase64(string format);

- **功能**:保存播放截图为base64数据字符串

- **返回值**:Base64字符串

- **参数**:
 + format ------ 支持格式：bmp, png, gif, jpg, jpeg

<!-- 3 -->
### <font color="#0099cc">显示隐藏播放工具条上的界面元素</font> {#setToolBarUIElementVisible}

<p style="background:#f7f7f7;color:#718c00">方法 setToolBarUIElementVisible ()</p>

>void setToolBarUIElementVisible(int UIElement, bool isVisible)

- **功能**:显示隐藏播放工具条上的界面元素

- **返回值**:无

- **参数**:
 + UIElement ------ 界面元素，定义见ToolBarUI
 + isVisible ------ 是否可见

>影音控件默认工具条可用

<!-- 4 -->
### <font color="#0099cc">绘制模式，是否拉伸绘制</font> {#keepAspectRatio}

<p style="background:#f7f7f7;color:#718c00">属性keepAspectRatio</p>

>bool keepAspectRatio

- **功能**:绘制模式，是否拉伸绘制

- **参数**:无

>读、写

<!--5 -->
### <font color="#0099cc">工具条是否可用</font> {#disableToolBar}

<p style="background:#f7f7f7;color:#718c00">方法 disableToolBar ()</p>

>void disableToolBar(int bDisable)

- **功能**:工具条是否可用

- **返回值**:0:可用; 非0:不可用

- **参数**:无

>影音控件默认工具条可用