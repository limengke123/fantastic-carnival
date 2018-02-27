/**
 * Created by li on 2018/2/27 13:37.
 */
//注册全局的组件message
import Message from './message/index.js'

const install = function (Vue, options = {}) {
    Vue.prototype.$message = Message
}
export default {
    install
}