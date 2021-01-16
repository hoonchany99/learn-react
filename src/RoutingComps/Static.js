import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Static extends Component{
    render(){
        return(
            <div>
                <h1> Content that doesn't change based on route.</h1>
                <Link classname = 'some-link' to ='/posts/dynamic/'>Dynamic Page</Link>
            </div>
        )
    }
}

export default Static