# 一个博客项目

## 结构

暂时还是前端渲染的spa，server端返回一个Html,js去动态生成页面。  

client分成两块：  
1. admin-page  
    博客的后台录入页面，也是文章的管理页面  
2. client-page  
    博客的展示页面  

开发采用webpack-dev-server开发，代理转发到本地起的localhost:3333/api下的REST接口
生产模式打包后的文件，放置在server的static目录下
## 要求
server用到了async/await，node>=7.6  
需要安装mongodb

## how to start  
* 开启Mongodb服务  
* 安装依赖  
    ```
    npm i
    ```
* server  
    ```
    npm run dev-server
    ```
    访问localhost:3333
* admin-page  
    ```
    npm run dev-admin
    ```
    访问localhost:8000  
    打包：  
    ```
    npm run build-admin
    ```
* client-page  
    ```
    npm run dev-client
    ```
    访问localhost:8001  
    打包：  
    ```
    npm run build-client
    ```
* 开发模式  
    开启server，用webpack-dev-server开发，请求代理到server  
* 生产模式
    打包后，访问：  
        1. admin-page:  
            localhost:3333/admin  
        2. client-page:  
            localhost:3333/client
## server 

koa、koa-router、koa-static，mongoose驱动mongodb，参考用切面（aop）方式处理请求。

server地址:
[https://github.com/limengke123/fantastic-carnival/tree/master/server](https://github.com/limengke123/fantastic-carnival/tree/master/server)


## admin-page  
vue全家桶：  
vue、vue-router、vuex、axios

编辑器用simplemde,默认样式好看，功能丰富

admin-page地址：
[https://github.com/limengke123/fantastic-carnival/tree/master/admin](https://github.com/limengke123/fantastic-carnival/tree/master/admin)



## client-page
react全家桶：  
react、react-router、mobx、axios

client-page地址：
[https://github.com/limengke123/fantastic-carnival/tree/master/client](https://github.com/limengke123/fantastic-carnival/tree/master/client)

