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
  state = {
      name: '',
      username: '',
      password: '',
      role: '',
      phoneNum: '',
      about: ''
  }

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    // const { value } = this.state
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            control={Select}
            label='Account Type'
            options={options}
            placeholder='Select Account Type'
          />
          <Form.Field
            control={Input}
            label='Username'
            placeholder='Username'
          />
          <Form.Field
            control={Input}
            label='Password'
            placeholder='Password'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='Individual or Organization Name'
            placeholder='Name'
          />
          <Form.Field
            control={Input}
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