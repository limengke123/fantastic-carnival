/**
 * Created by li on 2018/3/1 9:10.
 */
import axios from 'axios'
import router from '../router/index'
import Vue from 'vue'

const http = axios.create({
    timeout:10000
})

/**
 * 请求前的拦截
 * 如果sessionStorage里面有token
 * 请求头里面加authorization字段
 * */
http.interceptors.request.use(config=>{
    if(sessionStorage.getItem('token')){
        config.headers.Authorization = "Bearer " + sessionStorage.getItem('token')
    }
    return config
},err =>{
    return Promise.reject(err)
})

/**
 * 请求后的拦截
 * 如果后端返回状态码是401,返回到登录页面
 * */
http.interceptors.response.use(response => {
    return response
},err =>{
    if(err.response){
        console.log(err)
        switch (err.response.status){
            case 401:
                //Vue.prototype.error()
                //console.log(from)
                let option = {
                    path:'/'
                }
                if(window.location.pathname !== "/"){
                    option.query = {
                        redirect:router.currentRoute.fullPath
                    }
                }
                router.replace(option)
                console.log('force return to login-page')
                break;
        }
    }
    return Promise.reject(err)
})



exports.http = http

exports.httpInstall = function(Vue,option={}){
    Vue.prototype.$http = http
}