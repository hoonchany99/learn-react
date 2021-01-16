import React, { Component } from 'react'

function MyTextInput(props) {
    function handleC(e) {
        if (props.onChange) props.onChange(e)
    }
    return (
        <p>
            <input type='email' value={props.value} name={props.name} ref={props.inputRef} onChange={handleC} />
        </p>
    )
}
//reusable text input
//inputRef는 child로 전달할때 사용, ref는 바로 쓸때 사용

class MyInputBlock extends Component {
    constructor(props){
        super(props)
        this.textInput = null
        this.setTextInputRef = element => {
            this.textInput = element
        }
        this.focusTextInput = () => {
            if (this.textInput) this.textInput.focus()
        }
    }

    handleC= (e) => {
        if (this.props.onChange) this.props.onChange(e)
    }

    componentDidMount(){
        this.focusTextInput()
    }

    render() {
        return(
            <div>
                <p><input ref={this.setTextInputRef} type='text' placeholder='Your Name' name={this.props.inputFullName} onChange={this.handleC}/></p>
                <p><textarea placeholder='Your Message' name={this.props.inputContentName} onchange={this.handleC}></textarea></p>
            </div>
        )
    }
}

class Forms extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: '', //initiailize possible
            content: '',
            email: '',
        }
        this.inputFullNameRef = React.createRef()
        this.inputEmailRef = React.createRef()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const data = this.state
        console.log(this.inputFullNameRef.current.value)
        console.log("Final data is ", data)
    }
    handleChange = (e) => {
        e.preventDefault()
        // console.log(e.target.name)
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFocusClick = (e) => {
        e.preventDefault()
        this.inputEmailRef.current.focus()
    }

    handleClearClick = (e) => {
        e.preventDefault()
        // this.inputFullNameRef.current.value = ''
        this.setState({
            fullName: '',
        })
    }

    render() {
        const { fullName } = this.state
        const { email } = this.state
        return (
            <div>
                <h1>Forms and Inputs</h1>
                <p>Full name is: {fullName}</p>
                <form onSubmit={this.handleSubmit}>
                    <MyTextInput inputRef={this.inputEmailRef} value={email} name='email' onChange={this.handleChange} />
                    <MyInputBlock onChange={this.handleChange} inputFullName = 'fullName' inputContentName = 'content'/>
                    {/* <p><input ref={this.inputFullNameRef} type='text' placeholder='Your Name' value={fullName} name='fullName' onChange={this.handleChange} /></p>
                    <p><textarea ref={node => this.inputContentRef = node} placeholder='Your Message' name='content' required={true} onChange={this.handleChange}></textarea></p> */}
                    <p><button>Send Message</button></p>
                    <p><button onClick={this.handleFocusClick}>Focus</button></p>
                    <p><button onClick={this.handleClearClick}>Clear</button></p>
                </form>
            </div>
        )
    }
    //inline ref 는 textarea ref 처럼 사용

    componentDidMount() { // 여기서도 initialize 가능
        // this.setState({
        //     fullName : "Tony Yoon"
        // })
        //this.inputFullNameRef.current.focus() // 페이지 뜨면 바로 input으로
    }
}

export default Forms