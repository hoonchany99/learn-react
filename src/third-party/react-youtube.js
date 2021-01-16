import React, {Component} from 'react'
import YouTube from 'react-youtube'
//https://youtu.be/_nBlN9yp9R8
//https://www.youtube.com/watch?v=_nBlN9yp9R8

class Hello extends Component{
    constructor(props){
        super(props)
        this.videoOnReady = this.videoOnReady.bind(this)
        this.state = {
            playerObj : null
        }
    }
    videoOnReady(event) {
        // access to player in all event handlers via event.target \
        const player = event.target
        this.setState({
            playerObj : player
        })
        player.seekTo(50)
        console.log(player.getCurrentTime())
      }
    videoOnPlay(event) {
        const player = event.target
        // access to player in all event handlers via event.target
      }
    videoStateChange(event){
        const player = event.target
        console.log(player.getCurrentTime())
    }

    componentWillUnmount(){ // 사용자가 종료 후 backend 로 정보를 보낸다거나 할 때
        const {playerObj} = this.state
        console.log(playerObj.getCurrentTime())
        
    }
    render() {
        const opts = {
          height: '390',
          width: '640',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          }
        }
        const {videoId} = this.props
    
        return <YouTube 
        videoId={videoId} 
        opts={opts} 
        onReady={this.videoOnReady}
        onPlay = {this.videoOnPlay}
        onStateChange = {this.videoStateChange} />
      }
    
      
    }

export default Hello