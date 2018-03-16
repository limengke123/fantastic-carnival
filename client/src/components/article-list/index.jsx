import React from 'react'
import {inject, observer} from 'mobx-react'

import style from './index.styl'

import Article from '../article-item/index'


@inject('articleListStore')@observer class ArticleList extends React.Component {
    constructor() {
        super(...arguments)
    }

    componentDidMount() {
        console.log('test props' ,this.props)
        const {articleListStore} = this.props
        articleListStore.getArticleList()
    }

    render() {
        const {articleListStore} = this.props
        return (
            <main className={style.wrapper}>
                {
                    articleListStore.articleList.map((article,index) => {
                        return <Article key={index} infos={article}/>
                    })
                }
            </main>
        )
    }
}
export default ArticleList