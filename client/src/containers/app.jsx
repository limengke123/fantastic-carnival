import React from 'react'

import NavTop from '../components/nav-top'
import Footer from '../components/footer'

import '../styl/reset.styl'

export default (props) => (
    <div>
        <NavTop/>
        <div className="body-wrapper">
            {props.children}
        </div>
        <Footer/>
    </div>
)