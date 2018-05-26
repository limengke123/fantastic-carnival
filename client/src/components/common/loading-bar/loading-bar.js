import LoadingBar from './loading-bar.jsx'
import React from 'react'
import ReactDom from 'react-dom'

window.react = React
window.reactDom= ReactDom
window.LoadingBar = LoadingBar

const div1 = document.createElement('section')
div1.setAttribute('id',"test1")

document.body.appendChild(div1)

window.div1 = div1

LoadingBar.newInstance = ( props = {}) => {
    const section = document.createElement('section')
    section.setAttribute('class',"$loading-bar")
    document.body.appendChild(section)

    const vNode = React.createElement(LoadingBar,Object.assign(props,{
        willUnmount(){
            ReactDom.unmountComponentAtNode(section)
            document.body.removeChild(section)
        }
    }))

    const LoadingBarInstance = ReactDom.render(vNode,section)

    // console.log(vNode,LoadingBarInstance)

    return {
        update(options){
            LoadingBarInstance.setState(options)
        },
        component:LoadingBarInstance,
        destroy(){
            document.body.removeChild(document.getElementsByClassName('$loading-bar')[0])
        }
    }

}

export default LoadingBar