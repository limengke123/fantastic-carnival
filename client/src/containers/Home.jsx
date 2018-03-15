import React from 'react'
import {Link} from 'react-router'

import style from './home.styl'

import ArticleList from '../components/article-list/index'
import SidePanel from '../components/side-panel/index'

export default () => (
    <div className={style.wrapper}>
        <main className={style.main}>
            <ArticleList/>
            <SidePanel/>
        </main>
    </div>
)