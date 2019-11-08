import React, { Component } from 'react'
import {  Redirect } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
import LoginForm from '../components/LoginForm'

class LoginView extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLoginChange = (event) => {
        // console.log('login change')
        // console.log('event.target.value = ', event.target.value)
        // console.log('event.target.name = ', event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLoginSubmit = () => {
        this.props.handleLoginSubmit(this.state);
        // this.props.history.push('/profile')
    }

    render() {
        return(
            <React.Fragment>
                {this.props.loggedIn? <Redirect to='/profile'/>: null}
                <LoginForm 
                handleLoginChange={this.handleLoginChange}
                handleLoginSubmit={this.handleLoginSubmit}
                username={this.state.username}
                password={this.state.password}
                />
            </React.Fragment>
        )
    }
}

export default LoginView
// withRouter(LoginView)