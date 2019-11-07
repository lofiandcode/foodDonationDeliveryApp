import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
// import { Link } from 'react-router-dom';

class LoginForm extends Component {

  render() {
    const { username, password, handleLoginChange, handleLoginSubmit } = this.props

    return (
      <Form onSubmit={handleLoginSubmit}>
        <Form.Group>
          <Form.Input
            placeholder='Username'
            name='username'
            value={username}
            onChange={handleLoginChange}
          />
          <Form.Input
            placeholder='Password'
            name='password'
            type='password'
            value={password}
            onChange={handleLoginChange}
          />
          <Form.Button 
            content='Submit'
          />
        </Form.Group>
      </Form>
    )
  }
}

export default LoginForm