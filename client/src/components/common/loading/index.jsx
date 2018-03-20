import React from 'react'

import Mask from '../mask/index'

import style from './index.styl'

export default class Loading extends React.Component{
    constructor(){
        super(...arguments)
    }

    render(){
        const {mask} = this.props
        return (
            <div className={style.wrapper}>
                {
                    mask
                        ?
                        <Mask/>
                        :
                        null
                }
                <div className={style.loading}/>
            </div>
        )
    }
}