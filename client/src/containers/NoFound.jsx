import React from 'react'
import {Link} from 'react-router'
export default class NoFound extends React.Component{
    render(){
        return (
            <div>
                you got wrong place~ click <Link to="/">me</Link> to the page!!
            </div>
        )
    }
}