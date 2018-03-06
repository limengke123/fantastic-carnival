/**
 * Created by li on 2018/3/1 11:01.
 */
import {http} from '../../../util/http'
import mutation_type from '../../mutation_type'
const {
    RECEIVE_ALL_POSTS,
    POST_FOCUS,
    POST_EDIT,
    POST_TITLE_EDIT,
    POST_SAVE,
    POST_TITLE_SAVE,
    POST_DELETE,
    POST_PUBLISH,
    POST_TITLE_UPDATE,
    POST_CONTENT_UPDATE,
    POST_EXCERPT_UPDATE,
    POST_LAST_EDIT_TIME,
    POST_CREATE,
    POST_TAG_UPDATE
} = mutation_type
export default {
    getAllPost({commit},tags){
        http.get('/api/drafts',{
            params:{
                tags
            }
        }).then(resp => {
            if(resp.status === 200){
                commit(RECEIVE_ALL_POSTS,resp.data.data)
            } else {
            }
        })
    },
    createPost({commit}){
        http.post('/api/drafts',{
            title:"新文章"
        }).then(resp => {
            if(resp.status === 200){
                console.log(resp)
                commit(POST_CREATE,resp.data.data)
            } else {
                console.log('保存post失败')
            }
        })
    },
    deletePost({commit,state}){
        http.delete(`/api/drafts/${state.currentPostId}`).then(resp => {
            if(resp.status === 200){
                console.log(resp)
            } else {
                console.log('删除失败')
            }
        })
    },
    focusOnPost({commit},index){
        commit(POST_FOCUS,index)
    },
    editPostTitle({commit}){
        commit(POST_TITLE_EDIT)
    },
    submitPostTitle({commit,state},title){
        return new Promise((resolve,reject) => {
            http.patch(`/api/drafts/${state.currentPostId}`,{
                title
            }).then(resp => {
                if(resp.status === 200){
                    commit(POST_TITLE_UPDATE,title)
                    commit(POST_LAST_EDIT_TIME,resp.data.data.lastEditTime)
                } else {
                    console.log('修改题目失败')
                }
            })
        })
    },
    savePostTitle({commit}){

    }
}