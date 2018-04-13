import React from 'react'
import style from './index.styl'

import throttle from 'lodash/throttle'

export default class BackTop extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            customStyle: {
                visibility: "hidden",
            }
        }
    }

    static scrollHandler = null

    componentDidMount() {
        const offsetHeight = this.props.offsetHeight || 300
        if (window.pageYOffset > offsetHeight) {
            this.setState({
                customStyle: {
                    visibility: 'visible'
                }
            })
        }
        const onScroll = () => {
            if (window.pageYOffset > offsetHeight) {
                this.setState({
                    customStyle: {
                        visibility: 'visible'
                    }
                })
            } else {
                this.setState({
                    customStyle: {
                        visibility: 'hidden'
                    }
                })
            }
        }

        BackTop.scrollHandler = throttle(onScroll, 500, 1000)



        window.addEventListener('scroll', BackTop.scrollHandler, {passive: true})
    }

    componentWillUnmount() {
        //解决切换路由 组件内部还在调用setState情况
        window.removeEventListener('scroll', BackTop.scrollHandler)
    }

    back = () => {
        if (window.pageYOffset > 0) {
            window.requestAnimationFrame(() => {
                window.scrollBy(0, -200)
                this.back()
            })
        }
    }

    render() {
        const {customStyle} = this.state
        return (
            <div className={style.wrapper} style={customStyle} ref={ref => this.self = ref}>
                <span className={style.btn} onClick={this.back} title="回到顶部"><i className="fa fa-arrow-up"/></span>
            </div>
        )
    }
}