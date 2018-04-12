import React from 'react'
import PropTypes from 'prop-types'

import style from './index.styl'

export default class LoadingBar extends React.Component{
    constructor(){
        super(...arguments)
        this.state = {
            show:true,
            percent:0,
            status:'success'
        }

        //this.mref = React.createRef()
    }

    render(){
        //let {height:outerHeight} = this.props
        //outerHeight = outerHeight || 2
        return (
            <div ref={ref => this.self = ref}>
                {this.show ?
                    <div className={style["loading-bar"]} style={{height:'2px'}}>
                        <div className={style["loading-bar-inner"]}/>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

LoadingBar.propTypes = {
    color:PropTypes.string,
    failedColor:PropTypes.string,
    height:PropTypes.number
}