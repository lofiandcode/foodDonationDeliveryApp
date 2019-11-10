import React, { Component, Fragment } from 'react';
import CreateAccountForm from '../components/CreateAccountForm'

class CreateProfileView extends Component {
    render() {
        return (
            <Fragment>
                <CreateAccountForm handleCreateAccountSubmit={this.props.handleCreateAccountSubmit}/>
            </Fragment>
        )
    }
}

export default CreateProfileView