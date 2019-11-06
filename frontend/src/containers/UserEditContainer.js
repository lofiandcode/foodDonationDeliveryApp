import React, { Component } from 'react';
import UserForm from '../components/UserForm'

class UserEditContainer extends Component {

    render() {
        return (
            <div>
              <UserForm user={this.props.user} handleFormChange={this.props.handleFormChange} handleSubmit={this.handleSubmit}/>  
            </div>
        );
    };

}

export default UserEditContainer