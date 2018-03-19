import {observable, action, runInAction} from 'mobx'
import axios from '../util/http'
class ArticleDetail {
    @observable article = {
        title:'',
        content:'',
        excerpt:'',
        lastEditTime:'',
        createTime:'',
        tags:[{
            name:''
        }],
        prevArticle:{
            title:"",
            id:""
        },
        nextArticle:{
            title:"",
            id:""
        },
    }
    @action("请求单个文章页面数据")
    getDetail(id){
        return new Promise((resolve,reject) => {
            axios.get(`/api/articles/${id}`)
                .then(resp => {
                    if(resp.status === 200){
                        runInAction(() => {
                            this.article = resp.data.data
                            resolve(resp)
                        })
                    } else {
                        console.log("请求出错")
                        reject(resp)
                    }
                }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    }
}

const articleDetailStore = new ArticleDetail()

export default articleDetailStore