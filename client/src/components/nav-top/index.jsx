import React from 'react'
import {Link, withRouter} from 'react-router'
import style from './index.styl'

class NavTop extends React.Component {
    constructor(){
        super(...arguments)
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
                        {[1, 2, 3].map((val, index) => (
                            <li key={index} className={style.navItem}><Link to="/tag">{`test${val}`}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(NavTop)