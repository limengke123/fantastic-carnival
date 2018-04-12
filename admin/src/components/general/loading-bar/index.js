import LoadingBar from './loading-bar.js'

let loadingBarInstance
let timer
const defaultSetting = {
    color:'primary',
    failedColor:'error',
    height:2
}

function _getLoadingBarInstance(){
    loadingBarInstance = loadingBarInstance || LoadingBar.newInstance(defaultSetting)
    return loadingBarInstance
}

function _update(options){
    const instance = _getLoadingBarInstance()
    instance.update(options)
}

function _clearTimer(){
    if(timer) {
        clearInterval(timer)
        timer = null
    }
}

function _hide(){
    setTimeout(() => {
        _update({
            show:false
        })
        setTimeout(()=> {
            _update({
                percent:0
            })
        }, 200)
    },800)
}

export default {
    start(){
        if(timer) return
        let percent = 0

        _update({
            percent,
            status:'success',
            show:true
        })

        timer = setInterval( () => {
            percent += Math.floor(Math.random() *3 +5)
            if(percent > 95) _clearTimer()
            _update({
                percent:percent,
                status:'success',
                show:true
            })
        }, 200)
    },
    update (percent,status='success'){
        _clearTimer()
        _update({
            percent,
            status:status,
            show:true
        })
    },
    finish (){
        _clearTimer()
        _update({
            percent:100,
            status:'success'
        })
        _hide()
    },
    delayFinish(delayTime = 200){
        //针对近乎同步的操作提供的一种加载条
        _clearTimer()
      setTimeout(() => {
          _update({
              percent:100,
              status:'success'
          })
          _hide()
      },delayTime)
    },
    error(){
        _clearTimer()
        _update({
            percent:100,
            status:'error',
            show:true
        })
        _hide()
    },
    config(options){
        if(!options) throw(`loading-bar.config is need options`)
        options.color && (defaultSetting.color = options.color)
        options.failedColor && (defaultSetting.failedColor = options.failedColor)
        options.height && (defaultSetting.height = options.height)
    },
    destroy(){
        _clearTimer()
        const instance = _getLoadingBarInstance()
        loadingBarInstance = null
        instance.destroy()
    }
}