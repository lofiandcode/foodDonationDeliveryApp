import React, { Component } from 'react';
import User from '../components/User';
import About from '../components/About';
import DonationsContainer from '../containers/DonationsContainer';
import Contact from '../components/Contact';

class UserView extends Component {
    render() {
        return (
            <div>
                <User user={this.props.currentUser}/>
                <About user={this.props.currentUser}/>
                <DonationsContainer 
                    user={this.props.currentUser} 
                    handleDonationChange={this.props.handleDonationChange} 
                    newDonation={this.props.newDonation} 
                    handleDonationSubmit={this.props.handleDonationSubmit}
                />
                <Contact user={this.props.currentUser}/>
            </div>
        )       
    };
}

export default UserView;