import React from 'react'
import {Link, withRouter} from 'react-router'
import style from './index.styl'

class NavTop extends React.Component {
    constructor(){
        super(...arguments)
        this.state = {
            navTag:[
                {
                    name:"首页",
                    link:'/',
                    isActive:false
                },
                {
                    name:'标签页',
                    link:'/tag',
                    isActive:false,
                },
                {
                    name:'暂无',
                    link:'/404',
                    isActive:false
                }
            ]
        }
    }
    jumpHome = () => {
        this.props.router.push('/')
    }

    render() {
        return (
            <div className={style.wrapper}>
                <div className={style.header}>
                    <div className={style.logo} onClick={this.jumpHome}/>
                    <ul className={style.navLink}>
                        {this.state.navTag.map(val => (
                            <li key={val.name} className={`${style.navItem}`}><Link onlyActiveOnIndex activeClassName={style.activeNav} to={val.link}>{val.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(NavTop)