import React from 'react'
import DonationCard from '../components/DonationCard'
import DonationForm from '../components/DonationsForm'

const DonationsContainer = (props) => {
    const displayDonationsForm = () => {
        if (props.user.role !== 'driver') {
            return <div>
                        <h4>Donations:</h4>
                        <DonationForm handleDonationChange={props.handleDonationChange} newDonation={props.newDonation} handleDonationSubmit={props.handleDonationSubmit}/>
                    </div>
        } else {
            return null
        }
    }


    const displayDonations = () => {
        if (props.user) {
            if (props.user.items) {
                if (props.user.items.length > 0) {
                    return props.user.items.map((item, idx) => <DonationCard key={idx} item={item}/>)
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
            {displayDonationsForm()}
            <ul>
                {displayDonations()}
            </ul>
        </div>
    );
            
};

export default DonationsContainer