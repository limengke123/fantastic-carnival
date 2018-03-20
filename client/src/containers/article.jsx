import React from 'react'
import {inject, observer} from 'mobx-react'

import ArticleDetail from '../components/article-detail/index'
import SidePanel from '../components/side-panel'

//回到顶部
import BackTop from '../components/common/backTop'
import ArticleSort from '../components/article-sort/index'



import style from './article.styl'

@inject("articleDetailStore") @observer
class Article extends React.Component{
    constructor(){
        super(...arguments)
    }

    componentDidMount(){
    }

    render(){
        return (
            <div className={style.wrapper}>
                <div className={style.main}>
                    <ArticleDetail/>
                    <SidePanel/>
                    <BackTop/>
                </div>
            </div>
        )
    }
}


export default Article