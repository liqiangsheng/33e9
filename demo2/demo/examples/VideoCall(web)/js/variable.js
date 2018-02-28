//全局对象
var g_is_init = false;//是否初始化
var g_server_addr;//服务器地址
var g_user_id;//用户id
var g_nick_name;//昵称
var g_login_type;//登录类型
var g_meet_id;//会议id
var g_meet_pwd;//会议密码
var g_session_call_id;//会话id
var g_call_user_id;//对方id
var g_call_user_que;//呼叫的队列
var g_me_user_id;//自己的id

var g_loading_index = -1;
var g_loading_deleted = false;

var g_meeting = false;//会议进行中
var g_bg_color = 0;
var g_residual_timer = -1;
//目录地址
var g_location_dir = function()
{
    var location_dir = location.href
    var end = location_dir.lastIndexOf('/')
    var start = location_dir.indexOf('file:///')
    if(start > -1)
    {
        start = 8
    }else
    {
        start = 0;
    }
    location_dir = location_dir.slice(start,end)+"/home/"
    location_dir = decodeURIComponent(location_dir);
    return location_dir
}();
var g_call_video;//呼叫的视频
var g_me_video;//自己的视频
var g_recording = false
var g_record_timer = -1;
var record_size_arr=[[0,0,0],[144,80,56]
,[224,128,72]
,[288,160,100]
,[336,192,150]
,[448,256,200]
,[512,288,250]
,[576,320,300]
,[640,360,350]
,[720,400,420]
,[848,480,500]
,[1024,576,650]
,[1280,720,1000]
,[1920,1080,2000]];
var g_que_dict;//列队数据
var g_queuing_info;//排队信息
var g_user_srv_layer_index = -1;//服务用户层索引
var g_user_que_layer_index = -1;//服务用户层索引

