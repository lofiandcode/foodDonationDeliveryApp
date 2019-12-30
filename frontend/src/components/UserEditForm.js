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
          role: this.props.user.role,
          phoneNum: this.props.user.phoneNum,
          about: this.props.user.about
        }
    }
    handleFormChange = (e) => {
        e.persist();
        // console.log('IN handleChange')
        // const key = e.target.name;
        this.setState({
          [e.target.name]: e.target.value
        }, () => console.log(`${e.target.name} = `, this.state[e.target.name]))
      }
    render() {
        // console.log('UserEditForm props = ', this.props)
        if (this.props.user.name) {
            // console.log('IN UserEditForm about to render form')
            return (
                <div>
                    <form>
                        <label>Name:</label>
                    <input
                        type="text"
                        name='name'
                        onChange={(e) => this.handleFormChange(e)}
                        value={this.state.name}
                    /><br/>
                    <label>Account Type:</label>
                    <input
                        type="text"
                        name='role'
                        onChange={(e) => this.handleFormChange(e)}
                        value={this.state.role}
                    /><br/>
                    <label>About:</label>
                    <input
                        type="text"
                        name='about'
                        onChange={(e) => this.handleFormChange(e)}
                        value={this.state.about}
                    /><br/>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name='phoneNum'
                        onChange={(e) => this.handleFormChange(e)}
                        value={this.state.phoneNum}
                    /><br/>
                    <button type='submit' onSubmit={ () => this.handleSubmit()}>Submit</button>
                    </form>
                </div>
            )
        } else {
            // console.log('IN UserEditForm outer else')
            return null;
        }
    }
}

export default UserEditForm

// import React from 'react'


// const FormExampleWidthField = () => (
//   <Form>
//     <Form.Group>
//       <Form.Input label='First name' placeholder='First Name' width={6} />
//       <Form.Input label='Middle Name' placeholder='Middle Name' width={4} />
//       <Form.Input label='Last Name' placeholder='Last Name' width={6} />
//     </Form.Group>
//     <Form.Group>
//       <Form.Input placeholder='2 Wide' width={2} />
//       <Form.Input placeholder='12 Wide' width={12} />
//       <Form.Input placeholder='2 Wide' width={2} />
//     </Form.Group>
//     <Form.Group>
//       <Form.Input placeholder='8 Wide' width={8} />
//       <Form.Input placeholder='6 Wide' width={6} />
//       <Form.Input placeholder='2 Wide' width={2} />
//     </Form.Group>
//   </Form>
// )

// export default FormExampleWidthField