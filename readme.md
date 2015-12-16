# express-seed

## 1. 生成 package.json
```
npm init
```

## 2. 安装必要包

```
npm install express --save
npm install mongoose --save
npm install body-parser --save
npm install morgan --save
```

## 3. 包说明

-  express 是一个 node 框架
-  mongoose 是 MongoDB ORM 库
-  body-parser 处理 POST 内容
-  morgan http 日志中间件


## 4. 创建服务器端入口 server.js

``` javascript
// server.js


var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 9097; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
```


## 5. 运行服务器

```
node server.js
```


## 6. 使用 Postman 测试

http://localhost:9097/api