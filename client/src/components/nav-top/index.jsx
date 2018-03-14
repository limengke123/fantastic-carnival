import React from 'react'
import style from './index.styl'

export default () => (
    <div className={style.wrapper}>
        <div className={style.logo}/>
        <ul className={style.navLink}>
            {[1,2,3].map((val,index) => (
                <li key={index} className={style.navItem}>{`test${val}`}</li>
            ))}
        </ul>
    </div>
)