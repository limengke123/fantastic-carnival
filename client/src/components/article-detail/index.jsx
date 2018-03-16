import React from 'react'
import {inject, observer} from "mobx-react/index";
import {withRouter} from 'react-router'
import style from './index.styl'

@inject('articleDetailStore') @observer
class ArticleDetail extends React.Component{
    constructor(){
        super(...arguments)
    }
    componentDidMount(){
        const {articleDetailStore, router, params} = this.props
        articleDetailStore.getDetail(params.id, router)
    }

    render(){
        const {articleDetailStore} = this.props
        const {article} = articleDetailStore
        return (
            <div className={style.wrapper}>
                <header>
                    <h2 className={style.title}>
                        {article.title}
                    </h2>
                    <p className={style.info}>
                        <span>修改时间：{article.lastEditTime} </span>
                        <span> | </span>
                        <span>tags: {article.tags.map(val => `${val.name} `)}</span>
                    </p>
                </header>
                <article>
                    {article.content}
                </article>
            </div>
        )
    }
}

export default withRouter(ArticleDetail)