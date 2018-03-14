
import React from 'react'
import ReactDom from 'react-dom'

import Routes from './router'

const root = document.createElement('div')

document.body.appendChild(root)

ReactDom.render(
    <Routes/>
,root)