import React, {Component} from 'react'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'

export default class Test extends Component{
    render(){
        return (
            <Router>
                <ul>
                    {[
                        {
                            to:'/',
                            text:'home'
                        },{
                            to:'/about',
                            text:'关于'
                        },{
                            to:'/topics',
                            text:'topics'
                        },
                    ].map((val,index) =>
                        <li key={index}><Link to={val.to}>{val.text}</Link></li>
                    )}
                </ul>
                <hr/>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/topics" component={Topics} />
            </Router>
        )
    }
}
const Home = () => (
    <h2>home</h2>
)
const About = () => (
    <h2>About</h2>
)

const Topics = ({match}) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={`${match.url}`} render={() => <h3>please select a topic</h3>}/>
    </div>
)

const Topic = ({match}) =>(
    <h3>{match.params.topicId}</h3>
)
