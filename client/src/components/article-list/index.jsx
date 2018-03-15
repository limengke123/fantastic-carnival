import React from 'react'

import style from './index.styl'

import axios from '../../util/http'

import Article from '../article/index'


export default class ArticleList extends React.Component {
    constructor() {
        super(...arguments)
        this.state = {
            articles: [
                {
                    title: "",
                    excerpt: "",
                    time: "",
                    tags: []
                }
            ],
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData(){
        axios.get('/api/articles')
            .then(resp => {
                console.log('outer', resp.data.data.articles)
                this.setState({
                    articles: resp.data.data.articles
                })
            })
    }

    render() {
        return (
            <main className={style.wrapper}>
                {
                    this.state.articles.map((info, index) => {
                        return <Article key={index} infos={info}/>
                    })
                }
            </main>
        )
    }
}