import React from 'react'

const DonationForm = (props) => {
    return (
        <form onSubmit={props.handleDonationSubmit}>
            <input type='text' onChange={props.handleDonationChange} value={props.newDonation} placeholder='Enter a Donation'/>
            <input type='submit' value='submit'/>
        </form>
    );

}

export default DonationForm