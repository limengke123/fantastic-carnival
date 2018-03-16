import React from 'react'
import {withRouter} from 'react-router'
import {inject, observer} from 'mobx-react'

@inject('articleDetailStore') @observer
class ArticleDetail extends React.Component{
    constructor(){
        super(...arguments)
    }

    componentDidMount(){
        console.log(this.props)
    }

    routerWillEnter(){
        console.log(1)
    }

    render(){
        return (
            <div>
                this is article-detail page!!!
            </div>
        )
    }
}

export default withRouter(ArticleDetail)