import React, { Component } from 'react'
import {  Redirect } from 'react-router-dom';
import { Message, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
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
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateAccountClick = () => {
        this.props.history.push('/profile/create')
    }

    handleLoginSubmit = () => {
        this.props.handleLoginSubmit(this.state);
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
                <Button basic onClick={this.handleCreateAccountClick}>Create Account</Button>
                {this.props.loginError? 
                    <Message className='loginError'
                    error
                    header='Action Forbidden'
                    content='Incorrect Username and/or Password.'
                    /> 
                    : 
                    null 
                }

            </React.Fragment>
        )
    }
}

export default withRouter(LoginView)
// 