import React from 'react'
import style from './index.styl'

import ArticleSort from '../article-sort/index'
import SelfIntro from '../self-intro/index'
import Timer from '../common/timer/index'
import FirendLink from '../firend-link/index'

export default () => (
    <div className={style.wrapper}>
        <SelfIntro/>
        <Timer/>
        <ArticleSort/>
        <FirendLink/>
    </div>
)