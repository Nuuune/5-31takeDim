# snsec-weapp

#安装配置
需要在【小程序后台】=>设置 => 开发设置 => 服务器设置 => request合法域名:

uploadFile合法域名	https://eval.oss-cn-hangzhou.aliyuncs.com
request合法域名	    https://apis.map.qq.com



##阿里云云存储图片规范

默认规则域名/sample.jpg?x-oss-process=style/stylename

| 名称                   | 尺寸          | Cool  |
| -----------------------|:-------------:| -----:|
| thumb-manufacturer     | 160 x 90      | $1600 |
| feed-single-img-thumb  | 1080 x 1080   |   $12 |
| feed-multi-img-thumb   | 218 x 218     |    $1 |
| thumb-sns-topic-list   | 160 x 160     |    $1 |
| cover-4-3              | 800 x 600     |    $1 |



