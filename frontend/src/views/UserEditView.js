import React, { Component } from 'react';
import UserEditForm from '../components/UserEditForm'

class UserEditView extends Component {

    render() {
        return (
            <div>
              <UserEditForm 
              user={this.props.currentUser} 
              handleUserEditFormSubmit={this.props.handleUserEditFormSubmit}/>  
            </div>
        );
    }

}

export default UserEditView