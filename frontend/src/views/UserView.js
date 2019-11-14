import React, { Component } from 'react';
import User from '../components/User';
import About from '../components/About';
import DonationsContainer from '../containers/DonationsContainer';
import Contact from '../components/Contact';

class UserView extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         name: ''
    //     }
    // }

    // componentDidMount() {
    //     const users
    //     var origin1 = new google.maps.LatLng(55.930385, -3.118425);
    //     var origin2 = 'Greenwich, England';
    //     var destinationA = 'Stockholm, Sweden';
    //     var destinationB = new google.maps.LatLng(50.087692, 14.421150);

    //     var service = new google.maps.DistanceMatrixService();
    //     service.getDistanceMatrix(
    //     {
    //         origins: [origin1, origin2],
    //         destinations: [destinationA, destinationB],
    //         travelMode: 'DRIVING',
    //         transitOptions: TransitOptions,
    //         drivingOptions: DrivingOptions,
    //         unitSystem: UnitSystem,
    //         avoidHighways: Boolean,
    //         avoidTolls: Boolean,
    //     }, callback);


    // }
    // callback = (response, status) => {
    //     // See Parsing the Results for
    //     // the basics of a callback function.
    //   }
    render() {
        // console.log("%cProfile render fires", "color:red;")
        // console.log('props at render = ', this.props)
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