import React from 'react'
import {observer, inject} from 'mobx-react'

import Panel from '../common/panel'

import style from './index.styl'

@inject('tagStore') @observer
export default class ArticleSort extends React.Component{

    componentDidMount(){
        this.props.tagStore.getTag()
    }

    render(){
        const {tagStore} = this.props
        const tagList = tagStore.tags.map((val,index) => (
            <li key={val.id} className={style.item}>{`${index + 1}. ${val.name}`}</li>
        ))
        tagList.unshift(<li className={style.item} key="0">全部</li>)
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