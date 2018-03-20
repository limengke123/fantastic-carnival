import React from 'react'

import NavTop from '../components/nav-top'
import Footer from '../components/footer'

import style from './app.styl'

import '../styl/reset.styl'
import '../styl/syntax.styl'

export default (props) => {
    return (
        <div className={style.wrapper}>
            <NavTop/>
            <div className={style.main}>
                {props.children}
            </div>
            <Footer/>
        </div>
    )
}