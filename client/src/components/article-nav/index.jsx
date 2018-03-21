import React from 'react'
import style from './index.styl'
import {withRouter} from 'react-router'

@withRouter
class ArticleNav extends React.Component {
    constructor() {
        super(...arguments)
    }

    linkToArticle = (id)=> {
        console.log(this.props.router)
        const {router} = this.props
        router.push(`/article/${id}`)
    }

    render() {
        const {prevArticle, nextArticle} = this.props
        return (
            <div className={style.wrapper}>
                {
                    prevArticle
                        ?
                        <aside className={`${style.item} ${style.prev}`}>
                            <i className="fa fa-arrow-left" onClick={() => this.linkToArticle(prevArticle.id)}/>
                            <span onClick={() => this.linkToArticle(prevArticle.id)} title={prevArticle.title}>上一篇：{prevArticle.title}</span>
                        </aside>
                        :
                        <aside className={`${style.item} ${style.prev} ${style.none}`}>
                            <i className="fa fa-arrow-left"/>
                            <span>上一篇：无</span>
                        </aside>
                }
                {
                    nextArticle
                        ?
                        <aside className={`${style.item} ${style.next}`}>
                            <span onClick={() => this.linkToArticle(nextArticle.id)} title={nextArticle.title}>下一篇：{nextArticle.title}</span>
                            <i className="fa fa-arrow-right" onClick={() => this.linkToArticle(nextArticle.id)}/>
                        </aside>
                        :
                        <aside className={`${style.item} ${style.next} ${style.none}`}>
                            <span>下一篇：无</span>
                            <i className="fa fa-arrow-right"/>
                        </aside>
                }
            </div>
        )
    }
}

export default ArticleNav
// export default withRouter(ArticleNav)
