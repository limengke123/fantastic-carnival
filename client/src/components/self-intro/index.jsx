import React from 'react'

import Panel from '../common/panel/index'

import style from './index.styl'

export default class SelfIntro extends React.Component{
    constructor(){
        super(...arguments)
    }
    render(){
        return (
            <Panel customStyle={{padding:0}}>
                <div className={style.main}>
                    <div className={style.bg}/>
                    <div className={style.text}>
                        <h3 className={style.name}><span>Van Gogh</span></h3>
                        <p className={style.info}>
                            一些一些的文字文字啊文字不够多那就在多家点文字啊啊
                        </p>
                    </div>
                    <div className={style.avater}/>
                </div>
            </Panel>
        )
    }
}