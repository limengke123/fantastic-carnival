import React from 'react'
// import {Link} from 'react-router'

import style from './home.styl'

import ArticleList from '../components/article-list/index'
import SidePanel from '../components/side-panel/index'
// import ArticleSort from '../components/article-sort/index'
import BackTop from '../components/common/backTop/index'

export default () => (
    <div className={style.wrapper}>
        <main className={style.main}>
            <ArticleList/>
            <SidePanel/>
        </main>
        <BackTop offsetHeight={100}/>
    </div>
)