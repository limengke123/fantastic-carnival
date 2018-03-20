import React from 'react'

const withLoading = BaseComponent => (props) => (
    props.articleDetailStore.isLoading
        ?
        <div>加载中。。。</div>
        :
        <BaseComponent {...props}/>
)


const flatten = propKey => BaseComponent => props => <BaseComponent {...props} {...props[propKey]}/>

const control = BaseComponent => {
    return class Hoc extends React.Component{
        render(){
            let props = {
                ...this.props,
                message:"hehehhe"
            }
            return (
                <BaseComponent {...props}/>
            )
        }
    }
}

export {
    withLoading,
    flatten,
    control
}
