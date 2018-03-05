/**
 * Created by li on 2018/3/1 11:01.
 */
import {http} from '../../../util/http'
export default {
    getAllPost({dispatch},tags){
        http.get('/api/')
    }
}