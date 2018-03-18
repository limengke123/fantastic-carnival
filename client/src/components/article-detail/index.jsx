import React from 'react'
import {inject, observer} from "mobx-react/index";
import {withRouter} from 'react-router'
import style from './index.styl'
import markdown from '../../util/filter'

import '../../styl/syntax.styl'
// import '../../styl/code.styl'

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
                        <span>发布时间：{article.lastEditTime} </span>
                        <span> | </span>
                        <span>{article.tags.map(val => <span key={val.name} className={style.tagItem}>{val.name}</span>)}</span>
                    </p>
                </header>
                <article className="markdown-body" dangerouslySetInnerHTML={{__html:markdown(article.content)}}/>
            </div>
        )
    }
}

export default withRouter(ArticleDetail)