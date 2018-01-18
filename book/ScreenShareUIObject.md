# <font color="#2674ba">ScreenShareUI对象</font>

>ScreenShareUI是远端屏幕显示控件。

<!-- 1 -->
### <font color="#0099cc">拍照</font>

<p style="background:#f7f7f7;color:#718c00">方法  savePic  ()</p>

>long savePic(string pathFileName)

- **功能**:拍照

- **返回值**:0:成功； 非0：保存遇到的错误码

- **参数**:无

<!-- 2 -->
### <font color="#0099cc">清空缓存的图像</font>

<p style="background:#f7f7f7;color:#718c00">方法  clear  ()</p>

>long savePic(string pathFileName)

- **功能**:清空缓存的图像

- **返回值**:0:成功； 非0：保存遇到的错误码

- **参数**:无

<!-- 3 -->
### <font color="#0099cc">检查图像是否为空</font>

<p style="background:#f7f7f7;color:#718c00">属性isPicEmpty</p>

>long isPicEmpty

- **功能**:检查图像是否为空

- **返回值**:无

- **参数**:无

>可读.0: 有图像, 1:无图像

<!-- 4 -->
### <font color="#0099cc">控制功能是否开启</font>

<p style="background:#f7f7f7;color:#718c00">属性ctrlOpen</p>

>bool ctrlOpen

- **功能**:控制功能是否开启

- **返回值**:无

- **参数**:无

>可读、可写.true: 开启， false:关闭