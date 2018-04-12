import React from 'react'

import Panel from '../panel/index'

import style from './index.styl'

export default class Timer extends React.Component {
    constructor() {
        super(...arguments)
        const initDate = new Date()
        this.state = {
            date: initDate,
        }
    }

    //计时器需要清除
    static timer


    componentDidMount() {
        const func = () => {
            this.setState({
                date: new Date()
            })
        }
        this.timer = setInterval(func, 1000)
    }


    componentWillUnmount(){
        clearInterval(this.timer)
    }

    static paddingZero(num) {
        num = parseInt(num)
        return num < 10 ? `0${num}` : num
    }

    render() {
        const {date} = this.state
        const [year, month, day, hour, minutes, seconds] = [
            Timer.paddingZero(date.getFullYear()),
            Timer.paddingZero(date.getMonth() + 1),
            Timer.paddingZero(date.getDate()),
            Timer.paddingZero(date.getHours()),
            Timer.paddingZero(date.getMinutes()),
            Timer.paddingZero(date.getSeconds())
        ]
        return (
            <Panel>
                <div className={style.wrapper}>
                    <span>
                        {year}-
                    </span>
                    <span>
                        {month}-
                    </span>
                    <span>
                        {day} &nbsp;
                    </span>
                    <span>
                        {hour}:
                    </span>
                    <span>
                        {minutes}:
                    </span>
                    <span>
                        {seconds}
                    </span>
                </div>
            </Panel>
        )
    }
}