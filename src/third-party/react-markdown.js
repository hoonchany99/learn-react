import  React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'

class Hello extends Component{
    render(){
        const input = '<h1>Hello World</h1>\n\n# [This](http://joincfe.com/youtube) is a header \n\nAnd this is a paragraph'
        const disallowed = []
        return (
            <ReactMarkdown 
            source={input} 
            escapeHtml = {false}
            disallowedTypes = {disallowed}/>
        )
    }
}

export default Hello