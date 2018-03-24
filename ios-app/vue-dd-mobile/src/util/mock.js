
import Mock from 'mockjs'

export  default  Mock.mock('/data/list',{
    'list|6':[{
      'value':1,
      'name':'@DATETIME("yyyy-MM-dd HH:mm:ss")',
      'category':'@TITLE(1)'
    }]
})
