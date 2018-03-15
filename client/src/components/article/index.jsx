import React from 'react'

import style from './index.styl'

export default class Article extends React.Component{
    constructor(){
        super(...arguments)
    }
    render(){
        const {infos} = this.props
        return (
            <article className={style.wrapper}>
                <div className={style.main}>
                    <h3 className={style.title}>{infos.title || "沒有title"}</h3>
                    <p className={style.info}>
                        <span>{infos.lastEditTime}</span>
                        <span>标签：{infos.tags.map(val => val.name)}</span>
                    </p>
                    <p className={style.excerpt}>{infos.excerpt} ...</p>
                    <span className={style.more}>阅读全文>></span>
                </div>
            </article>
        )
    }
}