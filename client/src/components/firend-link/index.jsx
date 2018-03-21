import React from 'react'

import Panel from '../common/panel/index'

import style from './index.styl'

export default class FirendLink extends React.Component {
    constructor(){
        super(...arguments)
        this.state = {
            links :[{
                title:"github地址",
                url:"https://github.com/limengke123",
                icon:"github"
            },{
                title:"font-awesome地址",
                url:"http://fontawesome.dashgame.com/",
                icon:"font-awesome"
            }]
        }
    }
    render() {
        return (
            <Panel title={"友情链接"}>
                <div className={style.wrapper}>
                    {
                        this.state.links.map((link, index) => (
                            <a title={link.title} href={link.url} target="_blank" key={index}><i className={`fa fa-${link.icon}`}/></a>
                        ))
                    }
                </div>
            </Panel>
        )
    }
}