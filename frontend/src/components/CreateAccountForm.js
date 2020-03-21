import React, { Component } from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  TextArea,
} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

const options = [
  { key: 'driver', text: 'Driver', value: 'driver' },
  { key: 'donor', text: 'Donor', value: 'donor' },
  { key: 'FB', text: 'Food Bank', value: 'food bank' },
]

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      role: '',
      phoneNum: '',
      about: ''
    }
  }
  handleChange = (e) => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSelectChange = (e) => {
    this.setState({
      role: e.target.innerText.toLowerCase()
    })
  }

  handleSubmit = (e) => {
    this.props.handleCreateAccountSubmit(e, this.state);
    this.props.history.push('/profile/address')
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Group widths='equal'>
          <Form.Field
            control={Select}
            options={options}
            name='role'
            selection={this.state.role}
            onChange={this.handleSelectChange}
            label='Account Type'
            placeholder='Select Account Type'
          />
          <Form.Field
            control={Input}
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
            label='Username'
            placeholder='Username'
          />
          <Form.Field
            control={Input}
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            label='Password'
            placeholder='Password'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
            label='Individual or Organization Name'
            placeholder='Name'
          />
          <Form.Field
            control={Input}
            name='phoneNum'
            value={this.state.phoneNum}
            onChange={this.handleChange}
            label='Phone'
            placeholder='(xxx) xxx-xxxx'
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          name='about'
          value={this.state.about}
          onChange={this.handleChange}
          label='About'
          placeholder='Tell us more about you...'
        />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    )
  }
}

export default withRouter(CreateAccountForm)