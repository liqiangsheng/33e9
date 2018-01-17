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
 + index ------ <font face="微软雅黑">第几个对象； index=0代表取第一个对象</font>

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
 + index ------ <font face="微软雅黑">第几个对象； index=0代表取第一个对象</font>

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
 + index ------ <font face="微软雅黑">第几个对象； index=0代表取第一个对象</font>

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