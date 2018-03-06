/**
 * Created by li on 2018/3/1 11:01.
 */
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
    [RECEIVE_ALL_POSTS](state,postList){
        state.all = postList
    },
    [POST_CREATE](state,post){
        state.all.unshift(post)
        state.currentPostIndex = 0;
        state.currentPostId = state.all[0].id
        state.title = state.all[0].title
        state.articleId = state.all[0].article
    },
    [POST_FOCUS](state,index){
        state.currentPostIndex = index
        state.currentPostId = state.all[index].id
        state.excerpt = state.all[index].excerpt
        state.articleId = state.all[index].article
        state.title = state.all[index].title
    },
    [POST_TITLE_EDIT](state){
        if(!state.postTitleSaved){
            state.postTitleSaved = true
        }
    },
    [POST_TITLE_UPDATE](state,title){
        state.title = title
        state.all[state.currentPostIndex].title = title
    },
    [POST_LAST_EDIT_TIME](state,time){
        state.all[state.currentPostIndex].lastEditTime = time
    }
}