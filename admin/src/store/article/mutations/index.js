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
    }
}