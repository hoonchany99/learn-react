import React , {Component} from 'react'

class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            count : 0,
            start : true
        }
    }
    render(){
        const {count} = this.state
        const {start} = this.state
        return(
            <div>
                <h1>Current Count : {count}</h1>
                
                {start === true ? 
                <button onClick = {this.doChangeInterval}>Start</button>
                 : <button onClick = {this.stop}>Stop</button>}
            </div>
        )
    }
    componentDidMount(){ // 이거하면 render을 다시 실행한다. 
        //this.doChangeInterval()
    } 

    doChangeInterval = () => {
        this.setState(prevState => ({
            start : !prevState.start
        }))
        this.myInterval = setInterval(() => {
            this.setState({
                        count : this.state.count + 1,
                    })
        },1)
    }

    stop=() =>{
        this.setState(prevState => ({
            start : !prevState.start
        }))
        clearInterval(this.myInterval)
    }

    componentWillUnmount(){
        clearInterval(this.myInterval)
    }
}

export default Timer