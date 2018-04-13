import React from 'react'
import {observer, inject} from 'mobx-react'

import Panel from '../common/panel'

import style from './index.styl'

@inject('tagStore') @inject("articleListStore") @observer
export default class ArticleSort extends React.Component{

    constructor(){
        super(...arguments)
        this.state = {
            //只显示十条标签，为负数时显示所有标签
            maxLength:10
        }
    }

    componentDidMount(){
        this.props.tagStore.getTag()
    }

    fetchList = (id) => {
        const {tagStore, articleListStore} = this.props
        articleListStore.getArticleList(id)
    }

    render(){
        const {tagStore} = this.props
        let newTags = []
        if(this.state.maxLength > 0){
            newTags = tagStore.tags.slice(0, this.state.maxLength)
        } else {
            newTags =tagStore.tags
        }
        const tagList = newTags.map((val,index) => (
            <li onClick={() => this.fetchList(val.id)} key={val.id} className={`${style.item}`}>{`${index + 1}. ${val.name}`}</li>
        ))
        tagList.unshift(<li onClick={() => this.fetchList("")} className={style.item} key="0">全部</li>)
        return (
            <Panel title="标签分类">
                {
                    <ol>
                        {tagList}
                    </ol>
                }
            </Panel>
        )
    }
}