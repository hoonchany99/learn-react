import React, { Component } from 'react'

class Postdetail extends Component {
  constructor(props) {
    super(props)
    // this.titlewasClicked = this.titlewasClicked.bind(this)
    this.toggleContent = this.toggleContent.bind(this)
    this.removeContent = this.removeContent.bind(this)
    this.state = {
      showContent: true,
      post: null
    }
    // 아래에 console.log(this.props) 하려고
  }
  toggleContent(e) {
    e.preventDefault()
    this.setState({ showContent: !this.state.showContent })
  }
  removeContent(e) {
    e.preventDefault()
    const { remove } = this.props
    remove(this.state.post)
  }
////////////////////////////////////////////////////
  setPostStateOnProps() {
    const { post } = this.props
    this.setState({
      post: post
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props !== prevProps) {
      this.setPostStateOnProps()
    }
  }
///////////////////////////////////////////////////////

  titlewasClicked = (event) => { // 이렇게 arrow function사용하면 bind 안해도됨
    event.preventDefault()
    console.log(this.props)

    const newItem = { 'title': 'my new title', 'content': this.state.post.content }
    this.setState({
      post: newItem
    })
    const { dataCallback } = this.props
    dataCallback(newItem)
  }
  componentDidMount() {
    const { post } = this.props
    this.setState({
      post: post
    })
  }
  render() {
    const { post } = this.state
    const { showContent } = this.state
    return (
      <div>
        {post !== null ?
          <div>
            <h1 onClick={this.titlewasClicked}>{post.title}{post.date}</h1>
            {showContent === true ? <p>{post.content}</p> : ""}
            <button onClick={this.toggleContent}>Toggle Content Display</button>
            <button onClick={this.removeContent}>Remove Content Display</button>
          </div> : ''}
      </div>
    )
  }
}

export default Postdetail