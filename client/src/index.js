import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'mobx-react'
import Routes from './router'
import store from './store/index'

const {
    articleDetailStore,
    articleListStore,
    tagStore,
} = store


const root = document.createElement('div')

document.body.appendChild(root)

ReactDom.render(
    <Provider tagStore={tagStore} articleListStore={articleListStore} articleDetailStore={articleDetailStore}>
        <Routes/>
    </Provider>
, root)