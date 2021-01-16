import React, {Component } from 'react'

import {Link} from 'react-router-dom'

class Dynamic extends Component{
    componentDidMount(){
        const {slug} = this.props.match.params
    }

    render(){
        const {slug} = this.props.match.params
        return(
            <div>
                <h1>{slug} that changes based on route</h1>
                <Link className = 'some-link' to = '/about/'>Static Page</Link>
            </div>
        )
    }
}
export default Dynamic