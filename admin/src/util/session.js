/**
 * Created by li on 2018/2/28 15:15.
 */

exports.session = function(Vue, options = {}){
    Vue.prototype.$session = {
        set({key,value}){
            sessionStorage.setItem(key,value)
        },
        get(key){
            sessionStorage.getItem(key)
        },
        checkLogin(context,resp){
            //检查返回参数 如果是有问题 返回到登录页面
            if(resp.body && resp.body.message){
                context.$message({
                    type:'error',
                    message:resp.body.message || "出现错误"
                })
                context.$router.push('/')
            }
        }
    }
}