import React from 'react'
import {withRouter} from 'react-router'
import {inject, observer} from 'mobx-react'

import ArticleDetail from '../components/article-detail/index'
import SidePanel from '../components/side-panel'

//回到顶部
import BackTop from '../components/common/backTop'
import ArticleSort from '../components/article-sort/index'

import style from './article.styl'

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
                    <div className={style.panelWrapper}>
                        <SidePanel/>
                        <ArticleSort/>
                    </div>
                    <BackTop/>
                </div>
            </div>
        )
    }
}


export default Article