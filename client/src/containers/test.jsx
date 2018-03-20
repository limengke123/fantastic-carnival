import React from 'react'


const Hoc = BaseComponent => (props) => {
    let newProps = {
        ...props,
        message: "hey"
    }
    console.log('Hoc')
    return (
        <BaseComponent {...newProps}/>
    )
}

const withLoading = BaseComponent => ({isLoading, ...otherProps}) => {
    console.log('withLoading')
    return (
        isLoading ?
            <div> i m loading now</div>
            :
            <BaseComponent {...otherProps}/>
    )
}

@Hoc @withLoading
class TestItem extends React.Component {
    constructor() {
        super(...arguments)
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <ol>
                {Object.keys(this.props).map(val => (
                    <li>{val}</li>
                ))}
            </ol>
        )
    }
}


class Test extends React.Component {
    render() {
        return (
            <div>
                <TestItem customProps={"i m customProps"} isLoading={false}/>
            </div>
        )
    }
}

export default Test