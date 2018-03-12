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
        if(state.postSaved && state.postTitleSaved){
            state.all = postList
            if(postList.length === 0){
                state.currentPostId = null
                state.currentPostIndex = -1
            }
        }
    },
    [POST_CREATE](state,post){
        state.all.unshift(post)
        state.currentPostIndex = 0;
        state.currentPostId = state.all[0].id
        state.title = state.all[0].title
        state.articleId = state.all[0].article
    },
    [POST_FOCUS](state,index){
        if(state.postSaved && state.postTitleSaved){
            state.currentPostIndex = index
            state.currentPostId = state.all[index].id
            state.excerpt = state.all[index].excerpt
            state.articleId = state.all[index].article
            state.title = state.all[index].title
        }
    },
    [POST_TITLE_EDIT](state){
        if(state.postTitleSaved){
            state.all[state.currentPostIndex].draftPublished = false,
            state.postTitleSaved = false
        }
    },
    [POST_TITLE_UPDATE](state,title){
        state.title = title
        state.all[state.currentPostIndex].title = title
    },
    [POST_LAST_EDIT_TIME](state,time){
        state.all[state.currentPostIndex].lastEditTime = time
    },
    [POST_TITLE_SAVE](state){
        if(!state.postTitleSaved){
            state.postTitleSaved = true
        }
    },
    [POST_EDIT](state){
        if(state.postSaved){
            state.all[state.currentPostIndex].draftPublished = false;
            state.postSaved = false
        }
    },
    [POST_EXCERPT_UPDATE](state,excerpt){
        state.all[state.currentPostIndex].excerpt = excerpt
    },
    [POST_SAVE](state){
        if(!state.postSaved){
            state.postSaved = true
        }
    },
    [POST_TAG_UPDATE](state){
        state.all[state.currentPostIndex].draftPublished = false
    },
    [POST_PUBLISH](state,id){
        state.articleId = id
    }
}