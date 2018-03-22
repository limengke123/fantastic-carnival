import React from 'react'
import {inject, observer} from "mobx-react/index";
import {withRouter} from 'react-router'
import style from './index.styl'
import markdown from '../../util/filter'

import ArticleNav from '../article-nav/index'

//import {withLoading} from '../../hoc/index'

import Loading from '../common/loading/index'

@inject('articleDetailStore') @observer
class ArticleDetail extends React.Component {
    constructor() {
        super(...arguments)
    }

    componentDidMount() {
        const {articleDetailStore, params} = this.props
        articleDetailStore.getDetail(params.id)
        window.title = articleDetailStore.article.title
        // window.title = articleDetailStore.article.title
    }

    componentWillUnmount() {
        const {articleDetailStore} = this.props
        articleDetailStore.deleteDetail()
    }

    componentWillReceiveProps(nextProps) {
        const {articleDetailStore, params, location} = nextProps
        if (location.pathname !== this.props.location.pathname) {
            //articleDetailStore.deleteDetail()
            articleDetailStore.getDetail(params.id)
            window.scrollTo(0, 0)
            window.title = articleDetailStore.article.title
        }
    }

    render() {
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
                        <span>{article.tags.map(val => <span key={val.name}
                                                             className={style.tagItem}>{val.name}</span>)}</span>
                    </p>
                </header>
                <article className="markdown-body" dangerouslySetInnerHTML={{__html: markdown(article.content)}}/>
                <ArticleNav prevArticle={article.prevArticle} nextArticle={article.nextArticle}/>
                {
                    articleDetailStore.isLoading
                        ?
                        <Loading mask/>
                        :
                        null
                }
            </div>
        )
    }
}

export default withRouter(ArticleDetail)
//export default ArticleDetail