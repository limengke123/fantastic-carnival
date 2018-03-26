import {observable, action, runInAction} from 'mobx'
import axios from '../util/http'

class Tag{
    @observable tags = []

    @observable activateItem = ""

    @action("请求所有的tag")
    getTag(tag = ""){
        axios.get(`/api/tags`).then(resp => {
                runInAction(() => {
                    this.tags = resp.data.data
                })
            }).catch(err => {
                console.log(err)
        })
    }

    @action("改变激活的tag")
    changeActive(id){
        this.activateItem = id
    }
}

const tagStore = new Tag()

export default tagStore