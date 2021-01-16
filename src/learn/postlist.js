import React, { Component } from 'react'
import Postdata from '../data/postdata.json'
import Postdetail from './postdetail.js'

class Postlist extends Component {
    constructor(props) {
        super(props)
        this.handleDataCallback = this.handleDataCallback.bind(this)
        this.handlePostRemove = this.handlePostRemove.bind(this)
        this.toggleListReverse = this.toggleListReverse.bind(this)
        this.toggleSortDate = this.toggleSortDate.bind(this)
        this.state = {
            postlist: [],
            isOldestFirst : true
        }
    }

    sortByDate(event){
        const { postlist } = this.state
        
        let newPostalist = postlist.reverse()

        this.setState({
            postlist: newPostalist.sort(function(a,b){
                return a.id - b.id
            })
        })
    }

    toggleSortDate(e){
        e.preventDefault()
        this.sortByDate()
    }

    toggleListReverse(event) {
        const { postlist } = this.state
        
        let newPostlist = postlist.reverse()

        this.setState({
            postlist: newPostlist
        })
        
    }

    handleDataCallback(postItem) {
        console.log(postItem)
        let currentpostlist = this.state.postlist
        currentpostlist.push(postItem)
        this.setState({
            postlist: currentpostlist
        })
    }
    handlePostRemove(postItem) {
        let currentPostList = this.state.postlist
        currentPostList.pop(postItem)
        this.setState({
            postlist: currentPostList
        })
    }

    

    componentDidMount() {
        this.setState({
            postlist: Postdata
        })
    }
    render() {
        const { postlist } = this.state
        return (
            <div>
                <h1>Hello there</h1>
                <span>
                <button onClick={this.toggleListReverse}>Reverse Order</button>
                <button onClick = {this.toggleSortDate}>Date Order</button>
                </span>

                
                {postlist.map((postdetail, index) => {
                    return (
                        <Postdetail
                            post={postdetail}
                            key={`post-list-key ${index}`}
                            dataCallback={this.handleDataCallback}
                            remove={this.handlePostRemove} />
                        //  <div>{postdetail.title}{postdetail.date}</div>
                    )
                })}
            </div>
        )
    }
}

export default Postlist