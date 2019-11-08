import React, { Component } from 'react';
import UserEditForm from '../components/UserEditForm'

class UserEditView extends Component {

    render() {
        console.log('UserEditView props = ', this.props)
        return (
            <div>
              <UserEditForm 
              user={this.props.currentUser} 
              handleFormChange={this.props.handleFormChange} 
              handleSubmit={this.props.handleSubmit}/>  
            </div>
        );
    }

}

export default UserEditView