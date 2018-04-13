import LoadingBar from './loading-bar.vue'
import Vue from 'vue'

LoadingBar.newInstance = options => {
    const _props = options || {}


    // 可以尝试用vue.extend 改写试试，应该和这种方式差不多
    const instance = new Vue({
        data:_props,
        render(h){
            return h(LoadingBar,{
                props:_props
            })
        }
    })

    const component = instance.$mount()
    // console.log(component)
    document.body.appendChild(component.$el)
    const loading_bar = instance.$children[0]

    return {
        update(options){
            // 直接更新组件实例的data属性，很粗暴
            'percent' in options && (loading_bar.percent = options.percent)
            options.status && (loading_bar.status = options.status)
            'show' in options && (loading_bar.show = options.show)
        },
        component:loading_bar,
        destroy(){
            document.body.removeChild(document.getElementsByClassName('loading-bar')[0])
        }
    }
}

export default LoadingBar
