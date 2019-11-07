import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class LoginForm extends Component {
  state = {}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => this.setState({ email: '', name: '' })

  render() {
    const { username, password } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
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