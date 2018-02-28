/**
 * Created by li on 2018/2/28 16:10.
 */

const trimFilter = function(value){
    return value.replace(/(^\s*)|(\s*$)/g,"")
}

const trimAll = function(value){
    return value.replace(/\s+/g,"")
}

export default {
    trimAll,
    trimFilter
}