import React from 'react'
import {observer} from 'mobx-react'

import style from './index.styl'

import axios from '../../util/http'

import Article from '../article/index'


@observer class ArticleList extends React.Component {
    constructor() {
        super(...arguments)
    }

    componentDidMount() {
        console.log(1)
        console.log(this.props)
        console.log(2)
    }

    render() {
        console.log(this.props)
        return (
            <main className={style.wrapper}>
                {
                    this.props.articleList.map(info => {
                        return <Article key={info.id} infos={info}/>
                    })
                }
            </main>
        )
    }
}
export default ArticleList