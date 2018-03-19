import {observable, action, runInAction} from 'mobx'
import axios from '../util/http'

class Tag{
    @observable tags = []

    @action("请求所有的tag")
    getTag(){
        axios.get(`/api/tags`)
            .then(resp => {
                runInAction(() => {
                    this.tags = resp.data.data
                    console.log(resp.data)
                })
            }).catch(err => {
                console.log(err)
        })
    }
}

const tagStore = new Tag()

export default tagStore