import {observable, computed, action, runInAction} from 'mobx'

import axios from '../util/http'

class ArticleStore{
    @observable articleList = [{
        title:"title",
        excerpt:"excerpt111",
        lastEditTime:"2012.2.2",
        tags:[{name:111}]
    }]
    @computed get articleLength(){
        return this.articleList.length || 0
    }
    @action("根据tag请求文章列表")
    getArticleList(tag = ""){
        axios.get('/api/articles',{
            params:{
                sort:-1,
                tag
            }
        }).then(resp => {
                runInAction(() => {
                    this.articleList = resp.data.data.articles
                })
            }).catch(err => {
            console.log(err)
        })
    }
}

const articleListStore = new ArticleStore()

export default articleListStore