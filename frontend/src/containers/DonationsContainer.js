import React from 'react'
import DonationCard from '../components/DonationCard'
import DonationForm from '../components/DonationsForm'

const DonationsContainer = (props) => {

    if (props.user) {
        if (props.user.items) {
            if (props.user.items.length > 0) {
                const displayDonations = props.user.items.map((item, idx) => <DonationCard key={idx} item={item}/>)
                return (
                    <div>
                        <h4>Donations:</h4>
                        <DonationForm handleDonationChange={props.handleDonationChange} newDonation={props.newDonation} handleDonationSubmit={props.handleDonationSubmit}/>
                        <ul>
                            {displayDonations}
                        </ul>
                    </div>
                );
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else {
        return null
    }
};

export default DonationsContainer