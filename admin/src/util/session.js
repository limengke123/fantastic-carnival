/**
 * Created by li on 2018/2/28 15:15.
 */

exports.session = function(Vue, options = {}){
    Vue.prototype.$freshSession = function(session){
        sessionStorage.setItem('token',session)
    }
}