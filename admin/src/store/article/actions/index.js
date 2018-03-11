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
/**
 * getAllPost @tags 拿到列表 @GET
 * createPost 创建一条post @POST
 * deletePost 删除一条Post @DELETE
 * focusOnPost 点击一条post触发
 * editPostTitle 修改title时触发，就改一个属性
 * submitPostTitle 提交title @PATCH
 * savePostTitle 保存title，修改属性
 * editPost 编辑保存，修改属性
 * modifyContent 修改内容 @PATCH
 * submitPostExcerpt 提交excerpt
 * savePost 保存状态
 * getDraft 获得草稿内容 @GET
 * */
export default {
    getAllPost({commit},tags){
        http.get('/api/drafts',{
            params:{
                tags
            }
        }).then(resp => {
            if(resp.status === 200){
                commit(RECEIVE_ALL_POSTS,resp.data.data)
                if(resp.data.data.length > 0){
                    //进来默认点击第一条
                    commit(POST_FOCUS,0)
                }
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
                    resolve()
                } else {
                    console.log('修改题目失败')
                    reject()
                }
            })
        })
    },
    savePostTitle({commit}){
        commit(POST_TITLE_SAVE)
    },
    editPost({commit}){
        commit(POST_EDIT)
    },
    modifyContent({state,dispatch},content){
        return new Promise((resolve,reject) => {
            http.patch(`/api/drafts/${state.currentPostId}`,{content})
                .then(resp => {
                    if(resp.status === 200){
                        console.log(resp.data.data.lastEditTime)
                        dispatch('submitPostExcerpt',{
                            excerpt:resp.data.data.excerpt,
                            time:resp.data.data.lastEditTime
                        })
                        dispatch('savePost')
                    } else {
                        reject(resp)
                    }
                }).catch(reject)
        })
    },
    submitPostExcerpt({commit},{excerpt,time}){
        commit(POST_EXCERPT_UPDATE,excerpt)
        commit(POST_LAST_EDIT_TIME,time)
    },
    savePost({commit}){
        commit(POST_SAVE)
    },
    getDraft({state}){
        return new Promise((resolve,reject) => {
            http.get(`/api/drafts/${state.currentPostId}`)
                .then(resp => {
                    if(resp.status === 200){
                        resolve(resp.data)
                    } else {
                        reject(resp)
                    }
                }).catch(reject)
        })
    },
    postTagsModify({commit},time){
        commit(POST_TAG_UPDATE)
        commit(POST_LAST_EDIT_TIME,time)
    },
    updateDraftTags({state},newTagArr){
        return new Promise((resolve,reject) => {
            http.patch(`/api/drafts/${state.currentPostId}`,{
                tags:newTagArr
            }).then(resp => {
                if(resp.status === 200){
                    resolve(resp.data)
                } else {
                    reject(resp)
                }
            }).catch(reject)
        })
    },
    publishPost({state,commit}){
        return new Promise((resolve,reject) => {
            http.post(`/api/publications`,{
                draftId:state.currentPostId
            }).then(resp => {
                if(resp.status === 200){
                    commit(POST_PUBLISH,resp.data.data.article.id)
                    resolve(resp.data)
                } else {
                    reject(resp)
                }
            }).catch(reject)
        })
    }
}