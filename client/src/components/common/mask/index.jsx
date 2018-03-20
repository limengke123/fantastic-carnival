import React from 'react'

import style from './index.styl'

export default class Mask extends React.Component {
    constructor() {
        super(...arguments)
    }

    render() {
        return (
            <div className={style.wrapper}/>
        )
    }
}