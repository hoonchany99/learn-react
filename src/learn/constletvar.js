import React, {Component} from 'react'

class ConstLetVar extends Component{
    constructor(props){
        super(props)
        let someVar = 'hello world'
        // eslint-disable-next-line eqeqeq
        if(someVar == 'hello world'){
            someVar = 'hello there'
        }
        console.log(someVar)
    }
    render(){
        
        return(
            <h1>Hello World</h1>
        )
    }
}

export default ConstLetVar

//대충 var는 옛날꺼고 
//const는 못 바꾸는 거, let은 바꿀 수 있음.