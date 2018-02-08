//
    var flag = 0;
    var flag1 = 0;
    var g_location_dir=location.href;//获取目录地址
    var g_logining=false; //登陆状态
    var cr_account; // 云屋授权账号
    var cr_psw;//云屋授权密码
    var g_nickname;//用户昵称
    var g_userID;//用户id
    var g_init = false; ///  是否初始化
    var g_residual_timer = -1;//剩余时间
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
    console.log(g_location_dir)
    var g_meetingId; // 创建的会议号
    var g_meetingPsw; // 会议密码
    var g_meeLoginTimes = 0; // 记录掉线的次数1
    var g_meeLoginTimes2 = 0; // 记录的掉线次数 2
    var g_init_room = false//是否初始化完房间
    var g_single_video = false//是否单摄像头
    var g_video_filename_list; // 媒体库所有媒体文件
	var g_getAll_videfile_list; // 获取所有视频文件信息
    var g_nowTime_play_num = -1; // 当前播放哪一个文件
    var g_FURate = 100*1024; // 录制视频的上传限制初始值 kb/s
    var g_mediaObj;  // 创建的 正在播放的媒体对象
    var g_videoAObj; // 创建的 video1 对象
    var g_videoBObj; // 创建的 vidoe2 对象
    var g_bg_color = 0; // 背景颜色初始
    var g_startRecord = false;	// 判断回放状态的全局变量
    var g_recordWidth = 640;  // 录制视频的宽度初始值
	var g_recordHeight = 360; // 录制视频的高度初始值
	var g_bitRate  = 350000;  // 录制视频码率的初始值
	var g_frameRate = 10;  // 录制视频帧率的初始值
    var g_recDataType = 7; // 录制视频的类型 初始值为音频+视频 纯音频为3
    var g_isUploadOnRecording = 0; // 是否边录边传
    var g_playbacking = false;  // 是否回放状态
    var g_play = false;// 是否播放状态
    var g_uploading = false; // 视频是否正在上传
    var g_record;  // 录制视频的文件名称
    var g_video_size_type = 8; 
    var g_first_set_video_and_med = true;
    var g_video_fps = 15
    var g_video_qp = 0;
     var num = 30;//时间
    var layout  = "layoutA"; //摄像头样式布局
    var video_size_arr=[[0,0,0],[144,80,56],[224,128,72],[288,160,100],[336,192,150],[448,256,200],[512,288,250],[576,320,300],[640,360,350],[720,400,420],[848,480,500],[1024,576,650],[1280,720,1000],[1920,1080,2000]];