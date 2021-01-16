import React, {Component} from 'react'

class LifeCycle extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading : true
        }
    }
    //componentWillMount => 옛날꺼 
    render(){
        const {loading} = this.state
        return <h1>{loading === true ? 'Hello world' : 'false'}</h1>
    }

    componentDidMount(){
        //async / api code
        this.setState({
            loading : false
        })
    }

    componentWillUnmount(){
        //unsubscribe
    }
}

export default LifeCycle