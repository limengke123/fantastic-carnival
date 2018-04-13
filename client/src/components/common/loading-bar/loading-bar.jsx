import React from 'react'
import PropTypes from 'prop-types'

import style from './index.styl'

export default class LoadingBar extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            show: true,
            percent: 0,
            status: 'success'
        }
    }

    static propTypes = {
        color: PropTypes.string,
        failedColor: PropTypes.string,
        height: PropTypes.number
    }

    static defaultProps = {
        height: 2,
        color:"primary",
        failedColor:"error"
    }

    static prefixCls = "loading-bar"

    getClasses() {
        let classes = []
        if (this.state.status === 'success' && this.props.color === 'primary') {
            classes = classes.concat(`${LoadingBar.prefixCls}-inner-color-primary`)
        }
        if (this.state.status === 'error' && this.props.failedColor === 'error') {
            classes = classes.concat(`${LoadingBar.prefixCls}-inner-failed-color-error`)
        }
        const _classes = classes.map(val => style[val])
        return _classes.join(' ')
    }


    getStyle() {
        const _style = {
            width: `${this.state.percent}%`,
            height: `${this.props.height}px`
        }
        if (this.state.color !== 'primary' && this.state.status === 'success') {
            _style.backgroundColor = this.props.color
        }
        if (this.state.failedColor !== 'error' && this.state.status === 'error') {
            _style.backgroundColor = this.props.failedColor
        }
        return _style
    }


    render() {
        return (
            <div ref={ref => this.self = ref} className={"hey"}>
                {this.state.show ?
                    <div className={style[LoadingBar.prefixCls]} style={{height: `${this.props.height}px`}}>
                        <div
                            className={`${style["loading-bar-inner"]} ${this.getClasses()}`}
                            style={this.getStyle()}
                        />
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}
