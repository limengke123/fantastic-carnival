import React from 'react'
import {withRouter} from 'react-router'
import {inject, observer} from 'mobx-react'

import ArticleDetail from '../components/article-detail/index'
import SidePanel from '../components/side-panel'

//回到顶部
import BackTop from '../components/common/backTop'

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
                        <SidePanel/>
                    </div>
                    <BackTop/>
                </div>
            </div>
        )
    }
}


export default Article