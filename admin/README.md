# admin页总结

这是博客系统的录入页面,也就是管理页面,难点在于频繁地和接口增删改查地交互,状态的管理容易出现问题.

## 框架及其相关

基本上是`vue`官方推荐的那一套,`vue`、`vue-router`、`vuex`、`mobx`，在编辑器的选择上是用的`simplemde`算是一个样式和功能都很不错的编辑器，`markdown`渲染成`html`用的就是常规的`highlight.js`。

## 登陆权限

### 请求控制

这个是要和后端配合起来，这里我和后端约定好，我的请求里面把cookie都给带上，cookie中带有token。`koa`在有需要登陆的controller处先设置一层登陆校验，拿到前端给的token对比一下，没有问题就`next`到业务`controller`，如果出现验证失败，那就返回一个*401*，那我在页面出用`axios`的请求拦截器进行返回拦截，发现是`401`的返回值，我也就知道是登陆有问题了，直接重定向到登陆页面。

### 页面控制

这里需要注意一下，`vue-router`里面有一个路由守卫的概念，其实就是监听路由变化的事件，所以在需要有登陆权限才能访问的页面实质上需要配合`vue-router`的一个`beforeEach`的钩子函数，跳到一个需要权限的页面之前，我先去给后端发一个校验是否登陆的请求，请求成功后才跳页面，否则就跳登陆页面。这里有一个小小的点需要提一下，当初这里也被绕进去了，就是后端在`check`这个校验是否登陆的`controller`的时候，如果鉴权失败是不能像其他`controller`返回一个`401`的，不然这个返回的401又被`axios`拦截，会造成问题，这里是否成功，都应该返回200。

## 打包优化

一开始基本没做什么打包优化，后来打包出来发现还是非常大的，这也是`spa`单页面打包出来的单个入口文件过大导致首页白屏的原因，所以也就开始了下面的一些优化手段：

### 按需加载

根据不同的路由，把对应的组件代码打包，访问这个路由的时候再去下载对应的`chunk`文件。优点很明显，我把登录页面单独打包成一个`chunk`文件，原来打开登录页面需要在下载完一个完整的`js`才可以，现在只要下载极小的`chunk`文件就能快速地打开了登录页面。

### 查看打包细节

按需加载就能解决打包问题过大的原因了吗？除了登录页以外的两个页面依然存在打包后的体积很大的问题，虽然相较未按需加载前已经好了很多了。虽然我们只知道打包后的文件非常大，却不知道到底为什么才写那么一些东西会变得如此庞大，所以这里需要用到一个`webpack`的一个检查打包细节的插件：`webpack-bundle-analyzer`

下面稍微介绍一下用法：

```js
// 引入
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 在plugins的数组中加入这一项
plugins:[
    // 打包分析
    new BundleAnalyzerPlugin()
    ],

```

配置好`webpack`后，重新打包一次，这个插件会在本地起一个服务，自动打开页面，页面上就很明显地告诉你打包出来的`bundle.js`里面到底什么东西体积这么大。基本上，自己写的东西会很小，占体积大的基本上都是第三方的库。

看了我的打包分析结果，发现`lodash`、`highlight.js`、`simplemde`。

### 继续优化

去看一下哪里引用了`lodash`,是怎么用的：

```js
import {debounce} from 'lodash'
```

这里用到了`lodash`的防抖函数，这里需要做的优化是按需引入，因为现在这种引入方法是把整个`lodash`打包进来了，需要改进成如下：

```js
import debounce from 'lodash/debounce'
```

就这一句话的改变，然后最后打包的结果大大变小，很关键！

`highlight.js`、`simplemde`不是按需引入的问题，没法优化。

### 打包细节

把最终需要打包的`webpack.pro.config.js`，稍作修改，把一些公共的库给单独提取出来打包成一个`vendor`的包，`vue`、`vue-router`这些库可以用cdn的方式引入，这样就能降低打包的体积了。特别是，把项目部署到只有*1M*带宽等带宽比较低的服务器时候，让一些库用一些cdn的方式引入，还是能够显著提升打开页面的速度。

```js
// 在配置中加入这样一项
externals: {
        "Vue":"vue",
        //"simplemde":"simplemde",
        //"highlight":"highlight.js"
    }
```

同时，在模版`html`中引入`vue`的连接：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>blog</title>
    <link href="https://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://cdn.bootcss.com/simplemde/1.11.2/simplemde.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/vue/2.5.13/vue.min.js"></script>
</head>
<body>
</body>
</html>
```

库文件单独打包成一个`vendor`：

```js
entry:{
        vendor:["vue",'vue-router','vuex','axios','lodash',"simplemde","highlight.js"],
    },
```

基本的压缩不要忘记配置上去：

```js
new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            output:{
                comments:false,
            },
            sourceMap:true
        })
```
