import React from 'react'
import style from './index.styl'

import throttle from 'lodash/throttle'

export default class BackTop extends React.Component{
    constructor(){
        super(...arguments)
        this.state = {
            customStyle:{
                display:'none',
            }
        }
    }

    componentDidMount(){
        if(window.pageYOffset > 300){
            this.setState({
                customStyle:{
                    display:'block'
                }
            })
        }
        let self = this.self
        const onScroll = () => {
            if (window.pageYOffset > 300) {
                self.style.display = 'block'
            } else {
                self.style.display = 'none'
            }
        }
        window.addEventListener('scroll',throttle(onScroll,500,1000),false)
    }

    back = () =>{
        if(window.pageYOffset > 0){
            window.requestAnimationFrame(() => {
                window.scrollBy(0 , -200)
                this.back()
            })
        }
    }

    render(){
        return (
            <div className={style.wrapper} style={this.state.customStyle} ref={ref => this.self = ref}>
                <span className={style.btn} onClick={this.back} title="回到顶部"><i className="fa fa-arrow-up"/></span>
            </div>
        )
    }
}