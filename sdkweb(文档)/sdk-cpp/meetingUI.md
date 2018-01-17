# 会议内可视化UI显示组件 {#ui}

-----------

## 成员视频UI显示组件 {#videoui}

> CloudroomVideoUI 是视频显示控件，它显示设定的用户的视频，是由[视频会议组件](#meeting.md)内相关接口的封装而成，如果此组件不满足需求，可以使用[视频会议组件](#meeting.md)内相关的接口自行实现。
> 多实例组件，在会话中可以为每一个视频用户创建一个用来显示其画面

* [设置视频源](#setVideo)
* [获取用户/摄像头编号](#getUserID)
* [保存成员画面截图](#saveVideoPic)
* [获取图像时间戳](#getPicFrameTime_video)
* [清空成员画面内容](#clearVideoUI)
* [是否保持显示比例](#videokeepAspectRatio)
* [是否显示昵称](#visibleNickName)
* [成员是否有图像](#isVideoPicEmpty)

### 设置视频源 {#setVideo}

```cpp
void setVideo(string userID, int videoID)
```

* **功能** 设置显示的目标用户视频
* **返回值** 无
* **参数**
  * userID 目标用户ID
  * videoID 用户的指定视频设备（-1，代表用户的默认视频设备）

> 从[会议内可观看摄像头列表](meeting.md#getWatchableVideos)中获取userID和videoID

### 获取用户/摄像头编号 {#getUserID}

```cpp
string getUserID()
```

* **功能** 获取当前显示的用户
* **返回值** 用户ID
* **参数** 无

```cpp
string getVideoID()
```

* **功能** 获取当前显示的用户的视频设备
* **返回值** 用户的摄像头ID
* **参数** 无

### 保存成员画面截图 {#saveVideoPic}

```cpp
int savePic(string pathFileName)
```

* **功能** 截图拍照
* **返回值** 0成功，非0为保存遇到的错误码；
* **参数**
  * pathFileName 保存为本地路径文件名

```cpp
string savePicToBase64(string format);
```

* **功能** 截图拍照
* **返回值** 以base64编码的图片数据，不成功返回空
* **参数**
  * format 图片格式，支持bmp, png, gif, jpg, jpeg

```cpp
SAFEARRAY(BYTE) savePicToArray(string format)
```
* **功能** 截图拍照
* **返回值** 图片数据的safe array，不成功返0长度的array
* **参数**
  * format 图片格式，支持bmp, png, gif, jpg, jpeg

### 获取图像时间戳 {#getPicFrameTime_video}

```cpp
long long getPicFrameTime();
```

* **功能** 获取图像时间戳
* **返回值** 当前图像数据对应的时间戳
* **参数** 无

### 清空成员画面内容 {#clear}

```cpp
void clear()
```

* **功能** 清空缓存的图像
* **返回值** 无
* **参数** 无

### 是否保持显示比例 {#videokeepAspectRatio}

```cpp
bool keepAspectRatio
```

* **功能** 设置显示的视频画面是否保持比例

> 属性，为true时保持比例不拉伸，UI组件大小不变，图像数据保持比例居中显示，空余区域黑色填充， false不保持比例进行拉伸

### 是否显示昵称 {#visibleNickName}

```cpp
int visibleNickName
```

* **功能** 检查昵称是否可见

> 属性，0可见，1不可见

### 成员是否有图像 {#isVideoPicEmpty}

```cpp
int isPicEmpty
```

* **功能** 检查图像是否为空

> 属性，只读，用于检查当前是否有图像，0: 有图像， 1:无图像

## 屏幕共享UI显示组件 {#shareui}

> CloudroomScreenShareUI 是屏幕共享开启后远端显示控件，是由[视频会议组件](#meeting.md)内相关接口的封装而成，如果此组件不满足需求，可以使用[视频会议组件](#meeting.md)内相关的接口自行实现。
> 单例组件，整个程序的生命过程中只能有有一个实例。

* [保存屏幕截图](#saveScreenPic)
* [获取图像时间戳](#getPicFrameTime_share)
* [清空共享屏幕内容](#clearScreen)
* [屏幕共享是否有图像](#isScreenPicEmpty)
* [是否允许他人屏幕标注](#enableMarked)
* [设置画笔风格](#setPenStyle)
* [是否显示保持比例](#screenkeepAspectRatio)
* [是否允许他人远程控制](#ctrlOpen)

### 保存屏幕截图 {#saveScreenPic}

```cpp
int savePic(string pathFileName)
```

* **功能** 拍照
* **返回值** 0成功，非0为保存遇到的错误码；
* **参数**
  * pathFileName 保存到本地的路径文件名
  
```cpp
string savePicToBase64(string format);
```

* **功能** 截图拍照
* **返回值** 以base64编码的图片数据，不成功返回空
* **参数**
  * format 图片格式，支持bmp, png, gif, jpg, jpeg

```cpp
SAFEARRAY(BYTE) savePicToArray(string format)
```
* **功能** 截图拍照
* **返回值** 图片数据的safe array，不成功返0长度的array
* **参数**
  * format 图片格式，支持bmp, png, gif, jpg, jpeg

### 获取图像时间戳 {#getPicFrameTime_share}

```cpp
long long getPicFrameTime();
```

* **功能** 获取图像时间戳
* **返回值** 当前图像数据对应的时间戳
* **参数** 无

### 清空共享屏幕内容 {#clearScreen}

```cpp
void clear()
```

* **功能** 清空缓存的图像
* **返回值** 无
* **参数** 无

### 共享是否有图像 {#isScreenPicEmpty}

```cpp
int isPicEmpty
```

* **功能** 检查图像是否为空

> 属性，只读，0有图像, 1无图像

### 是否允许他人屏幕标注 {#enableMarked}

```cpp
bool enableMarked
```

* **功能** 是否允许别人进行标注

> 属性

### 设置画笔风格 {#setPenStyle}

```cpp
void setPenStyle(int intRgb, int penWidth)
```

* **功能** 设置标注画笔样式
* **参数**
  * intRgb 颜色，排列方式bgr(8:8:8)
  * penWidth 画笔宽度

### 是否显示保持比例 {#screenkeepAspectRatio}

```cpp
bool keepAspectRatio
```

* **功能** 绘制模式，是否拉伸绘制

> 属性，为true时UI组件大小不变，图像数据保持比例居中显示，空余区域黑色填充

### 是否允许他人远程控制 {#ctrlOpen}

```cpp
int ctrlOpen
```

* **功能** 是否允许他人进行远程控制

> 属性

## 白板显示UI显示组件 {#boardui}

> CloudroomBoardUI 白板UI显示组件，是由[视频会议组件](#meeting.md)内相关接口的封装而成，如果此组件不满足需求，可以使用[视频会议组件](#meeting.md)内相关的接口自行实现。
> 单例组件，整个程序的生命过程中只能有有一个实例。

* [创建电子白板](#createBoard)
* [白板工具条是否可见](#setBoardToolBarVisible)
* [获取白板ID](#getBoardID)
* [删除白板](#deleteBoard)

### 创建电子白板 {#createBoard}

```cpp
string createBoard(int width, int height, string fileName)
```

* **功能** 创建组件内的电子白板
* **返回值** 返回值白板id字符串，否则是空字符串；
* **参数**
  * width 白板宽度
  * height 白板高度
  * fileName 白板背景图片文件，传空值则创建空白板

### 白板工具条是否可见 {#setBoardToolBarVisible}

```cpp
void setBoardToolBarVisible(bool isVisible)
```

* **功能** 设置白板工具条是否可见
* **返回值** 无
* **参数**
  * isVisible true可见，false不可见

### 获取白板ID {#getBoardID}

```cpp
string getBoardID()
```

* **功能** 获取当前电子白板的ID
* **返回值** 白板的ID
* **参数** 无

### 删除白板 {#deleteBoard}

```cpp
void deleteBoard()
```

* **功能** 关闭并删除当前白板
* **返回值** 无
* **参数** 无

## 影音共享UI显示组件 {#mediaui}

> CloudroomMediaUI 影音显示控件，是由[视频会议组件](#meeting.md)内相关接口的封装而成，如果此组件不满足需求，可以使用[视频会议组件](#meeting.md)内相关的接口自行实现功能。
> 单例组件，整个程序的生命过程中只能有有一个实例。

* [保存影音画面截图](#savePicToFile)
* [获取图像时间戳](#getPicFrameTime_media)
* [隐藏/显示播放工具条上的UI组件](#setToolBarUIElementVisible)
* [显示比例保持](#mediakeepAspectRatio)
* [是否禁用工具条](#disableToolBar)

### 保存影音画面截图 {#savePicToFile}

```cpp
int savePicToFile(string pathFileName);
```

* **功能** 保存播放影音画面到图片文件
* **返回值** 0成功，非0失败
* **参数**
  * pathFileName 本地绝对路径文件名

> 支持格式：bmp, png, gif, jpg, jpeg

```cpp
string savePicToBase64(string format);
```

* **功能** 保存播放截图为base64数据字符串
* **返回值** 以base64编码的图片数据，不成功返回空
* **参数**
  * format 支持格式：bmp, png, gif, jpg, jpeg

```cpp
SAFEARRAY(BYTE) savePicToArray(string format)
```
* **功能** 截图拍照
* **返回值** 图片数据的safe array，不成功返0长度的array
* **参数**
  * format 图片格式，支持bmp, png, gif, jpg, jpeg

### 获取图像时间戳 {#getPicFrameTime_media}

```cpp
long long getPicFrameTime();
```

* **功能** 获取图像时间戳
* **返回值** 当前图像数据对应的时间戳
* **参数** 无

### 隐藏/显示播放工具条上的UI组件 {#setToolBarUIElementVisible}

```cpp
void setToolBarUIElementVisible(int UIElement, bool isVisible);
```

* **功能** 显示隐藏播放工具条上的界面元素
* **返回值** 无
* **参数**
  * UIElement 界面元素，定义见[ToolBarUI](constant.md#ToolBarUI)
  * isVisible 是否可见

> 影音控件默认工具条可用

### 显示比例保持 {#mediakeepAspectRatio}

```cpp
bool keepAspectRatio
```

* **功能** 绘制模式，是否拉伸绘制

> 属性，为ture时UI组件大小不变，图像数据保持比例居中显示，空余区域黑色填充

### 是否禁用工具条 {#disableToolBar}

```cpp
void disableToolBar(int bDisable)
```

* **功能** 工具条是否可用
* **返回值** 0可用，非0:不可用
* **参数** 无

> 工具条默认不禁用