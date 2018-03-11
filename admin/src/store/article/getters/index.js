/**
 * Created by li on 2018/3/1 11:01.
 */
export default{
    postList(state){
        return state.all
    },
    postTitle(state){
        return state.title
    },
    postSaved(state){
        return state.postSaved
    },
    postTitleSaved(state){
        return state.postTitleSaved
    },
    currentPostId(state){
        return state.currentPostId
    },
    currentPostIndex(state){
        return state.currentPostIndex
    },
    articleIdOfPost(state){
        return state.articleId
    }
}