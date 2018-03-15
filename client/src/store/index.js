import {observable, computed, action, runInAction} from 'mobx'

import axios from '../util/http'

class ArticStore{
    @observable articleList = [{
        title:"title",
        excerpt:"excerpt111",
        lastEditTime:"2012.2.2"
    }]
    @computed get articleLength(){
        return this.articleList.length
    }
    @action getArticleList(){
        axios.get('/api/articles')
            .then(resp => {
                runInAction(() => {
                    this.articleList = resp.data.data.articles
                })
            }).catch(err => {
                console.log(err)
        })
    }
}

const store = new ArticStore()

export default store