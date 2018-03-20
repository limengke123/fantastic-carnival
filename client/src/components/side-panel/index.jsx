import React from 'react'
import style from './index.styl'

import ArticleSort from '../article-sort/index'
import SelfIntro from '../self-intro/index'
import Panel from '../common/panel/index'

export default () => (
    <div className={style.wrapper}>
        <SelfIntro/>
        <Panel title="this is test panel">
            <h3>this is content</h3>
        </Panel>
        <ArticleSort/>
    </div>
)