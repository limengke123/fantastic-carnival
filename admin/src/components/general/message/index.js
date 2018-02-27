/**
 * Created by li on 2018/2/7 13:29.
 */
import Vue from 'vue'
import Main from './main.vue'
let MessageConstructor = Vue.extend(Main)

let instance,instances = [],seed=1
const Message = function(options){
    if(typeof options === 'string'){
        options = {
            message:options
        }
    }
    let id = 'message_' + seed++
    instance = new MessageConstructor({
        data:options
    })
    instance.id = id
    //这里是在文档之外生成一个元素，需要手动挂载一遍
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
    instance.dom = instance.vm.$el
    instance.dom.style.zIndex = 999 + seed
    instances.push(instance)
    return instance.vm
}

export default Message
