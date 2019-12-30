import React, {Component} from 'react'
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

class UserEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: this.props.user.name,
          username: this.props.user.username,
          password: this.props.user.password,
          role: this.props.user.role,
          phoneNum: this.props.user.phoneNum,
          about: this.props.user.about
        }
    }
    handleChange = (e) => {
        e.persist();
        // console.log('IN handleChange')
        // const key = e.target.name;
        this.setState({
          [e.target.name]: e.target.value
        }, () => console.log(`${e.target.name} = `, this.state[e.target.name]))
    }
    handleSubmit = (e) => {
        this.props.handleCreateAccountSubmit(e, this.state);
        this.props.history.push('/profile/address')
    }
    render() {
        // console.log('UserEditForm props = ', this.props)
        if (this.props.user.name) {
            // console.log('IN UserEditForm about to render form')
            return (
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Select}
                            options={options}
                            name='role'
                            value={this.state.role}
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
                // <div>
                //     <form>
                //         <label>Name:</label>
                //     <input
                //         type="text"
                //         name='name'
                //         onChange={(e) => this.handleFormChange(e)}
                //         value={this.state.name}
                //     /><br/>
                //     <label>Account Type:</label>
                //     <input
                //         type="text"
                //         name='role'
                //         onChange={(e) => this.handleFormChange(e)}
                //         value={this.state.role}
                //     /><br/>
                //     <label>About:</label>
                //     <input
                //         type="text"
                //         name='about'
                //         onChange={(e) => this.handleFormChange(e)}
                //         value={this.state.about}
                //     /><br/>
                //     <label>Phone Number:</label>
                //     <input
                //         type="text"
                //         name='phoneNum'
                //         onChange={(e) => this.handleFormChange(e)}
                //         value={this.state.phoneNum}
                //     /><br/>
                //     <button type='submit' onSubmit={ () => this.handleSubmit()}>Submit</button>
                //     </form>
                // </div>
            )
        } else {
            // console.log('IN UserEditForm outer else')
            return null;
        }
    }
}

export default withRouter(UserEditForm)
