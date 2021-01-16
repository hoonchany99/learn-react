import React, {Component} from 'react'

class ParentWrapper extends Component{
    render() {
        const {alertType} = this.props
        const {children} = this.props
        return <div className = {'alert alert-' + alertType}>{children}</div>
    }
}

function AlertBox(props){
    return <div className = {'alert alert-' + props.alertType}>{props.children}</div>
}

function WelcomeHereDialog(){
    return <AlertBox alertType = 'success'><h1>Some new content</h1></AlertBox>
}
export {AlertBox, ParentWrapper} // 요런식으로 나머지 export
export default WelcomeHereDialog //default는 하나만 할 수 있다.