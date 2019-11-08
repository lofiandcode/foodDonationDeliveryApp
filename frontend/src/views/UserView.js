import React, { Component } from 'react';
import User from '../components/User';
import About from '../components/About';
import DonationsContainer from '../containers/DonationsContainer';
import Contact from '../components/Contact';
import MatchContainer from '../containers/MatchContainer';

class UserView extends Component {

    render() {
        console.log("%cProfile render fires", "color:red;")
        console.log('props at render = ', this.props)
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
                <MatchContainer 
                    driver={this.props.testDriver}
                    donor={this.props.testDonor}
                    food_bank={this.props.testFoodBank} 
                    items={this.props.testItem}
                />
            </div>
        )       
    };
}

export default UserView;