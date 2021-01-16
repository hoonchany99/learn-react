import React, {Component} from 'react'
import postdata from '../data/postdata.json'
import Postdetail from './postdetail'
class Hello extends Component{
  constructor(props){
    super(props)
    this.handledataCallback = this.handledataCallback.bind(this)
    this.state = {
      postList : []
    }
  }

  handledataCallback(PostItem){
    console.log(PostItem)
  }

  componentDidMount(){
    this.setState({
      postList : postdata
    })
  }

    render(){
      const {postList} = this.state
      return (
        <div>
      {postList.map((item , index) => {
        return <Postdetail 
        post = {item} 
        dataCallback = {this.handledataCallback}
        />
      })}
      </div>
      )
    }
}

export default Hello