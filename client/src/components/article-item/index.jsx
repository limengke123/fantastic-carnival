import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import style from './index.styl'

class Article extends React.Component{
    static propTypes = {
         infos:PropTypes.object.isRequired,
    }
    constructor(){
        super(...arguments)
    }

    jumpToDetail = () => {
        const {router, infos} = this.props
        router.push(`/article/${infos.id}`)
    }

    render(){
        const {infos} = this.props
        return (
            <article className={style.wrapper}>
                <div className={style.main}>
                    <h3 className={style.title} onClick={this.jumpToDetail}>{infos.title}</h3>
                    <p className={style.info}>
                        <span>{infos.lastEditTime} </span>
                        <span>标签：{infos.tags.map(val => `${val.name} `)}</span>
                    </p>
                    <p className={style.excerpt}>{infos.excerpt} ...</p>
                    <span className={style.more} onClick={this.jumpToDetail}>阅读全文>></span>
                </div>
            </article>
        )
    }
}

export default withRouter(Article)