/**
 * Created by li on 2018/2/28 16:10.
 */
import marked from 'marked'
const trimFilter = function(value){
    return value.replace(/(^\s*)|(\s*$)/g,"")
}

const trimAll = function(value){
    return value.replace(/\s+/g,"")
}

const md2Text = (markdown) => {
    let div = document.createElement('div')
    div.innerHTML = marked.parse(markdown)
    return trimFilter(div.innerText)
}

export default {
    trimAll,
    trimFilter,
    md2Text
}