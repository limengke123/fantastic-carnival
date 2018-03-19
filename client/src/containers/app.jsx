import React from 'react'

import NavTop from '../components/nav-top'
import Footer from '../components/footer'

import '../styl/reset.styl'
// import '../styl/github-markdown.css'

export default (props) => {
    const style = {
        maxWidth:"1200px",
        margin:"0 auto",
        display:"flex",
        justifyContent:"center"
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