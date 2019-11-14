import React from 'react'
import DonationCard from '../components/DonationCard'
import DonationForm from '../components/DonationsForm'

const DonationsContainer = (props) => {
    const displayDonations = () => {
        if (props.user) {
            if (props.user.items) {
                if (props.user.items.length > 0) {
                    return props.user.items.map((item, idx) => <DonationCard key={idx} item={item}/>)
                    // console.log("SKFAIDFHLAISEHFLAISEHF ", displayDonations)
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null
        }
    }
    return (
        <div>
            <h4>Donations:</h4>
            <DonationForm handleDonationChange={props.handleDonationChange} newDonation={props.newDonation} handleDonationSubmit={props.handleDonationSubmit}/>
            <ul>
                {displayDonations()}
            </ul>
        </div>
    );
            
};

export default DonationsContainer