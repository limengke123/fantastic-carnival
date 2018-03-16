
import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import Routes from './router'
import store from './store/index'

const {
    articleDetailStore,
    articleListStore
} = store

console.log(articleListStore)

const root = document.createElement('div')

document.body.appendChild(root)

ReactDom.render(
    <Provider articleListStore={articleListStore} articleDetailStore={articleDetailStore}>
        <div>
            <Routes/>
            {__ENV__.NODE_ENV === 'development' ? <DevTools/> : null}
        </div>
    </Provider>
,root)