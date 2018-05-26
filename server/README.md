# server 总结

整个server是学习和模仿一个他人的项目，中间还是有很多内容可以总结以供他人学习以及自己复习。

## 入口

`npm run server`是启动服务的开始，也就是去跑目录下的`register.js`，实际上这一步就是用`babel`编译了一次`node`的代码，因为项目用的`koa@2`框架，整体是基于`async/await`的，所以对`Node`要求`node>=7.6`，所以真正的入口文件是`index.js`，所以用的node版本是大于7.6的，可以省略babel编译这一步。

基本也就是一些常规的依赖引入，这里有一点处理的比较好，在`router`文件中暴露出一个`router`的`init`方法，只要传入`app`，就能把所有路由信息注入到`app`里面，简洁清楚。

需要注意的一点，尽量把一些配置信息提取出来到一个`config`文件，方便以后来回修改，避免在源码中来回修改，比如说服务的端口号、以及数据库地址等都应该写在`config`文件里。

同时，`koa-static`让`static`目录可以访问，方便后期`admin`、`client`两个项目打包出来的静态资源能够被访问。

## 路由

这里我注册了两个总路由，一个是负责接口调度的`api`路由，一个是返回对应`admin`、`client`页面的`page`路由。

**`api`路由有一个技巧，通常都是在固定`/api/`路径下，所以`koa-router`中可以这样定义这个`router`**

```js
const apiRouter = require('koa-router')({
    prefix: config.app.apiPath
})
```

api和page路由都是暴露一个接受`app`为参数的`init`方法，把全部路由注册进去。

## controller

### page

这个比较简单，对应的路径下，响应相对应`admin`、`client`打包生成的`html`

```js
router.get(`/admin`,function(ctx,next){
        ctx.type = 'text/html'
        ctx.body = fs.createReadStream(adminPath)
        return next()
    })
```

这样就可以在匹配`/admin`时，把`admin`项目里事先打包的好的`html`返回，`html`中的`script`标签会去找这个目录下打包的`js`文件，从而渲染成页面。这里有一个点需要注意，如果前端的项目是用`browserHistory`来实现前端路由的话，会存在`historyfallback`的问题，需要设置

```js
  router.get(`/admin/*`,function(ctx,next){
        ctx.type = 'text/html'
        ctx.body = fs.createReadStream(adminPath)
        // return next()
    })
```

这样在大部分的情况下都能解决问题，但是我这里还有一个`client`页面，所以存在一定的问题，暂时没办法解决，所以前端路由用的还是比较丑陋的`hashHistory`

### api

这个是整个服务最重要也是最核心的部分，给前端的页面提供api接口。

里面的`controller`全部采用[ES6](http://es6.ruanyifeng.com/)的[class](http://es6.ruanyifeng.com/#docs/class)语法来管理`controller`，同时继承了一个`AOP`的基本类，使得处理请求的代码变得一致，更好地维护。

> `AOP`指这种在运行时，动态地将代码切入到类的指定方法、指定位置上的编程思想就是面向切面的编程。

`AOP`在`java`的`spring`中用到，这里借用到了`node`项目中，让项目变得更加清楚。一个请求进来的时候，分成三个部分：

1. __before  前端请求参数校验
2. main 实际业务代码
3. __after 业务代码处理结束后

实际在业务的处理中，采用了`Restful`接口：

* GET 请求列表或是具体情况
* POST 新增一条信息
* PATCH 对已存在信息的更新
* DELETE 删除

在业务代码中，对具体的关于数据库的增删改查方法封装到`./service`目录下,避免`controller`方法的臃肿。

在需要权限的借口下，前后端约定统一返回一个`401`状态码,前端的`ajax`请求遇到`401`状态码，就可以直接当作是权限问题来处理。

> HTTP 错误 401.1 - 未经授权：访问由于凭据无效被拒绝。

整个api路由的难点在于`mongoose`的一些增删改查方法的学习和理解，我暂时也只是知道基本的一些方法，可以看看[mongoose的文档](http://mongoosejs.com/docs/api.html)以后好好学一下，写一篇关于`mongoose`的文章，这里先留一个坑。
