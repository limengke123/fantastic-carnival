import React from 'react'
import $loading from '../components/common/loading-bar/index'

const withLoading = BaseComponent => (props) => (
    props.articleDetailStore.isLoading
        ?
        <div>加载中。。。</div>
        :
        <BaseComponent {...props}/>
)


const flatten = propKey => BaseComponent => props => <BaseComponent {...props} {...props[propKey]}/>

const control = BaseComponent => {
    return class Hoc extends React.Component {
        render() {
            let props = {
                ...this.props,
                message: "hehehhe"
            }
            return (
                <BaseComponent {...props}/>
            )
        }
    }
}

const routerEnterHandle = (nextState, replace) => {
    $loading.start()
}

const routerLeaveHandle = () => {
    console.log(arguments)
    $loading.finish()
}

const withEachRouter = BaseComponent => {
    return class Hoc extends React.Component {
        render() {
            let props = {
                ...this.props,
                onEnter: routerEnterHandle,
                onLeave: routerLeaveHandle
            }
            return (
                <BaseComponent {...props}/>
            )
        }
    }
}

export{
    withLoading,
    flatten,
    withEachRouter
}

