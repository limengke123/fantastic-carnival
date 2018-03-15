
import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'mobx-react'

import Routes from './router'
import store from './store/index'

const root = document.createElement('div')

document.body.appendChild(root)

ReactDom.render(
    <Provider store={store}>
        <Routes/>
    </Provider>
,root)