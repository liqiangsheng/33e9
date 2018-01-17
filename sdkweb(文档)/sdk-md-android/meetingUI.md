# 会议内可视化UI显示组件 {#ui}

-----------

## 成员视频UI显示组件 {#videoui}

> VideoUIView 是视频显示控件，它显示设定的用户的视频，是由[视频会议组件](meeting.md#meeting)内相关接口的封装而成，如果此组件不满足需求，可以使用[视频会议组件](meeting.md#meeting)内相关的接口自行实现。
> 多实例组件，在会话中可以为每一个视频用户创建一个用来显示其画面

* [设置视频源](#setUsrVideoId)
* [获取用户/摄像头编号](#getUsrVideoId)
* [保存成员画面截图](#saveVideoPic)
* [清空成员画面内容](#clearVideoUI)

### 设置视频源 {#setUsrVideoId}

```Java
public void setUsrVideoId(UsrVideoId usrVideoId)
```

* **功能** 设置显示的目标用户视频
* **返回值** 无
* **参数**
  * usrVideoId 目标用户视频ID

> 从[会议内可观看摄像头列表](meeting.md#getWatchableVideos)中获取userID和videoID

### 获取用户/摄像头编号 {#getUsrVideoId}

```Java
public UsrVideoId getUsrVideoId()
```

* **功能** 获取当前显示的用户
* **返回值** 用户视频ID
* **参数** 无

### 保存成员画面截图 {#saveVideoPic}

```Java
public int savePicToFile(String pathFileName, CompressFormat format)
```

* **功能** 保存视频截图到图片文件
* **返回值** 0成功，非0为保存遇到的错误码；
* **参数**
  * pathFileName 保存为本地路径文件名
  * format 图片格式

```Java
public String savePicToBase64(CompressFormat format)
```

* **功能** 保存视频截图为base64数据字符串
* **返回值** 以base64编码的图片数据，不成功返回空
* **参数**
  * format 图片格式

### 清空成员画面内容 {#clearVideoUI}

```Java
public void clear()
```

* **功能** 清空缓存的图像
* **返回值** 无
* **参数** 无

## 屏幕共享UI显示组件 {#shareui}

> CloudroomScreenShareUI 是屏幕共享开启后远端显示控件，是由[视频会议组件](meeting.md#meeting)内相关接口的封装而成，如果此组件不满足需求，可以使用[视频会议组件](meeting.md#meeting)内相关的接口自行实现。
> 该组件整个程序内建议只创建一个实例。

## 影音共享UI显示组件 {#mediaui}

> CloudroomMediaUI 影音显示控件，是由[视频会议组件](meeting.md#meeting)内相关接口的封装而成，如果此组件不满足需求，可以使用[视频会议组件](meeting.md#meeting)内相关的接口自行实现功能。
> 单例组件，整个程序的生命过程中只能有有一个实例。

* [保存影音画面截图](#saveMediaPic)
* [清空影音画面内容](#clearMediaUI)

### 保存影音画面截图 {#saveMediaPic}

```Java
public int savePicToFile(String pathFileName, CompressFormat format)
```

* **功能** 保存播放影音画面到图片文件
* **返回值** 0成功，非0为保存遇到的错误码；
* **参数**
  * pathFileName 保存为本地路径文件名
  * format 图片格式

```Java
public String savePicToBase64(CompressFormat format)
```

* **功能** 保存播放截图为base64数据字符串
* **返回值** 以base64编码的图片数据，不成功返回空
* **参数**
  * format 图片格式

### 清空成员画面内容 {#clearMediaUI}

```Java
public void clear()
```

* **功能** 清空缓存的图像
* **返回值** 无
* **参数** 无
