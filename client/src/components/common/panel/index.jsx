import React from 'react'
import style from './index.styl'
export default class Card extends React.Component{
    constructor(){
        super(...arguments)
    }

    render(){
        const {...props} = this.props
        return (
            <aside className={style.wrapper}>
                {props.title ? <header className={style.title}>{props.title}</header> : null}
                <main className={style.main}>{props.children}</main>
            </aside>
        )
    }
}