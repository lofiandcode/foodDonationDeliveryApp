import React, {Component} from 'react'

class UserForm extends Component {
    render() {
        if (this.props.user.items) {
            if (this.props.user.items.length > 0) {
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
                        <label>Donation:</label>
                        <input
                            type="text"
                            name='donation'
                            onChange={(e) => this.props.handleDonationChange(e)}
                            value={this.props.user.items[0].name}
                        /><br/>
                        <button type='submit' onSubmit={ () => this.handleSubmit()}>Submit</button>
                        </form>
                    </div>
                )
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

export default UserForm