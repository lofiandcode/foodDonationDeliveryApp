import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'

class LoginView extends Component {

    constructor() {
        super();
        state = {
            username: '',
            password: ''
        }
    }

    handleLoginChange = (event) => {
        console.log('login change')
        console.log('event.target.value = ', event.target.value)
    }

    render() {
        return(
            <div>
                <LoginForm 
                handleLoginChange={this.handleLoginChange}
                username={this.state.username}
                password={this.state.password}
                />
            </div>
        )
    }
}

export default LoginView