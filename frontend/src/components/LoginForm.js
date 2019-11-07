import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class LoginForm extends Component {

  render() {
    const { username, password, handleSubmit } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder='Username'
            name='Username'
            value={username}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder='Password'
            name='Password'
            value={password}
            onChange={this.handleChange}
          />
          <Form.Button content='Submit' />
        </Form.Group>
      </Form>
    )
  }
}

export default LoginForm