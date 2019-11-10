import React, { Component } from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  TextArea,
} from 'semantic-ui-react'

const options = [
  { key: 'drive', text: 'Driver', value: 'driver' },
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
    console.log("CreateAccountForm = ", this.props)
  }
  handleChange = (e) => {
    e.persist();
    // console.log('IN handleChange')
    // const key = e.target.name;
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    // const { value } = this.state
    return (
      <Form onSubmit={(e) => this.props.handleCreateAccountSubmit(e, this.state)}>
        <Form.Group widths='equal'>
          <Form.Field
            control={Select}
            options={options}
            name='role'
            selection={this.state.role}
            onChange={this.handleChange}
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
        {/* <Form.Group inline>
          <label>Quantity</label>
          <Form.Field
            control={Radio}
            label='One'
            value='1'
            checked={value === '1'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label='Two'
            value='2'
            checked={value === '2'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label='Three'
            value='3'
            checked={value === '3'}
            onChange={this.handleChange}
          />
        </Form.Group> */}
        <Form.Field
          control={TextArea}
          name='about'
          value={this.state.about}
          onChange={this.handleChange}
          label='About'
          placeholder='Tell us more about you...'
        />
        {/* <Form.Field
          control={Checkbox}
          label='I agree to the Terms and Conditions'
        /> */}
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    )
  }
}

export default CreateAccountForm