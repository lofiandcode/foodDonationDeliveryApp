import React, {Component} from 'react'

class UserEditForm extends Component {
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
                        onChange={(e) => this.props.handleFormChange(e)}
                        value={this.props.user.name}
                    /><br/>
                    <label>Account Type:</label>
                    <input
                        type="text"
                        name='role'
                        onChange={(e) => this.props.handleFormChange(e)}
                        value={this.props.user.role}
                    /><br/>
                    <label>About:</label>
                    <input
                        type="text"
                        name='about'
                        onChange={(e) => this.props.handleFormChange(e)}
                        value={this.props.user.about}
                    /><br/>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name='phoneNum'
                        onChange={(e) => this.props.handleFormChange(e)}
                        value={this.props.user.phoneNum}
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