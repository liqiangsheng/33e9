//
    var g_location_dir=location.href;//获取目录地址
    var g_logining=false; //登陆状态
    var cr_account; // 云屋授权账号
    var cr_psw;//云屋授权密码
    var g_nickname;//用户昵称
    var g_userID;//用户id
    var g_init = false; ///  是否初始化
    var g_residual_timer = -1;//剩余时间
    var g_layout; // 视频和摄像头A 布局 两个视频播放布局
    var g_logo_id = "6cb4d64a-5647-11e7-bbc9-989096d01cf2";
    var end = g_location_dir.lastIndexOf('/');
    var start = g_location_dir.indexOf('file:///');
    if(start > -1)
    {
        start = 8
    }else
    {
        start = 0;
    }
    g_location_dir = g_location_dir.slice(start,end)+"/home/";
    g_location_dir = decodeURIComponent(g_location_dir);