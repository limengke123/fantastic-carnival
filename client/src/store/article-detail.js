import {observable, action, runInAction} from 'mobx'
import axios from '../util/http'

class ArticleDetail {
    @observable article = {
        title: '',
        content: '',
        excerpt: '',
        lastEditTime: '',
        createTime: '',
        tags: [{
            name: ''
        }],
        prevArticle: {
            title: "",
            id: ""
        },
        nextArticle: {
            title: "",
            id: ""
        },
    }

    @observable isLoading = false

    @action("请求单个文章页面数据")
    getDetail(id) {
        this.isLoading = true
        axios.get(`/api/articles/${id}`)
            .then(resp => {
                if (resp.status === 200) {
                    runInAction(() => {
                        this.article = resp.data.data
                        this.isLoading = false
                    })
                } else {
                    console.log("请求出错")
                }
            }).catch(err => {
            console.log(err)
        })
    }
    @action("清空之前保留的数据")
    deleteDetail(){
        this.article = {
            title: '',
            content: '',
            excerpt: '',
            lastEditTime: '',
            createTime: '',
            tags: [{
                name: ''
            }],
            prevArticle: {
                title: "",
                id: ""
            },
            nextArticle: {
                title: "",
                id: ""
            },
        }
    }
}

const articleDetailStore = new ArticleDetail()

export default articleDetailStore