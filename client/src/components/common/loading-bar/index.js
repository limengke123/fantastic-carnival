import React from 'react'
import LoadingBar from './loading-bar'
import ReactDom from 'react-dom'

let timer
let loadingBarInstance
const defaultSetting = {
    color:'primary',
    failedColor:'error',
    height:2
}

console.log(new LoadingBar())

export default {
    start(){
        ReactDom.render(<LoadingBar/>,document.body)
    },
    destroy(){
        //摧毁dom
        document.body.removeChild(document.getElementsByClassName('loading-bar')[0])
    }
}
