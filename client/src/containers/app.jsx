import React from 'react'

import NavTop from '../components/nav-top'
import Footer from '../components/footer'

import '../styl/reset.styl'

export default (props) => {
    const style = {
        width:"800px",
        margin:"0 auto"
    }
    return (
        <div>
            <NavTop/>
            <div style={style}>
                {props.children}
            </div>
            <Footer/>
        </div>
        )
}