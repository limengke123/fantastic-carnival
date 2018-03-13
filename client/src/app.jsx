import React,{Component} from 'react'

import ListPage from './page/list'
import TagPage from './page/tag'


export default class App extends Component{
    render(){
        return (
            <div>
                <ListPage/>
                <TagPage/>
            </div>
        )
    }
}