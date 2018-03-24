var express = require('express');
var app = express();

var Mock = require('mockjs');

app.get('/api/list', function (req, res) {
    setTimeout(function () {
        res.json(Mock.mock({
            'list|10': [{
                'id|+1': 1,
                'userName|1': ['张三', '李四', '王五', '提莫'],
                'status|1': [0, 1],
                'role|1': ['系统管理员', '前端开发工程师', '最强王者', '程序员鼓励师'],
                'email': '@EMAIL',
                'regexp3': /\d{5,10}/
            }]
        }));
    }, 1000)
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http', host, port);
});