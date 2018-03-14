import React from 'react'
import {Link} from 'react-router'
import style from './index.styl'

export default () => (
    <div className={style.wrapper}>
        <div className={style.header}>
            <div className={style.logo}/>
            <ul className={style.navLink}>
                {[1,2,3].map((val,index) => (
                    <li key={index} className={style.navItem}><Link to="/tag">{`test${val}`}</Link></li>
                ))}
            </ul>
        </div>
    </div>
)