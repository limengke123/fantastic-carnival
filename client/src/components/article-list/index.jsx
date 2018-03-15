import React from 'react'
import {inject, observer} from 'mobx-react'

import style from './index.styl'

import Article from '../article/index'


@inject('articleStore')@observer class ArticleList extends React.Component {
    constructor() {
        super(...arguments)
    }

    componentDidMount() {
        const {articleStore} = this.props
        articleStore.getArticleList()
    }

    render() {
        const {articleStore} = this.props
        const info = {
            title:1,
            excerpt:2,
            lastEditTime:3,
            tags:[{
                name:444
            }]
        }
        return (
            <main className={style.wrapper}>
                {
                    articleStore.articleList.map((article,index) => {
                        console.log(article)
                        return <Article key={index} infos={article}/>
                    })
                }
            </main>
        )
    }
}
export default ArticleList