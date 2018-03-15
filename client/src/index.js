
import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import Routes from './router'
import articleStore from './store/index'

const root = document.createElement('div')

document.body.appendChild(root)

ReactDom.render(
    <Provider articleStore={articleStore}>
        <div>
            <Routes/>
            {__ENV__.NODE_ENV === 'development' ? <DevTools/> : null}
        </div>
    </Provider>
,root)