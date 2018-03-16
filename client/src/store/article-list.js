import {observable, computed, action, runInAction} from 'mobx'

import axios from '../util/http'

class ArticStore{
    @observable articleList = [{
        title:"title",
        excerpt:"excerpt111",
        lastEditTime:"2012.2.2",
        tags:[{name:111}]
    }]
    @observable testNum = 0

    @computed get articleLength(){
        return this.articleList.length
    }
    @action("请求文章列表")
    getArticleList(){
        axios.get('/api/articles',{
            params:{
                sort:-1
            }
        })
            .then(resp => {
                runInAction(() => {
                    this.articleList = resp.data.data.articles
                })
            }).catch(err => {
            console.log(err)
        })
    }
}

const articleListStore = new ArticStore()

export default articleListStore