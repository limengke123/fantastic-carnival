import React from 'react'

import Panel from '../panel/index'

import style from './index.styl'

export default class Timer extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            date: new Date(),
        }
    }

    componentDidMount() {
        const func = () => {
            this.setState({
                date: new Date()
            })
        }
        setInterval(func, 1000)
    }

    paddingZero(num) {
        num = parseInt(num)
        return num < 10 ? `0${num}` : num
    }

    render() {
        const {date} = this.state
        const [year, month, day, hour, minutes, seconds] = [
            this.paddingZero(date.getFullYear()),
            this.paddingZero(date.getMonth() + 1),
            this.paddingZero(date.getDate()),
            this.paddingZero(date.getHours()),
            this.paddingZero(date.getMinutes()),
            this.paddingZero(date.getSeconds())
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