import React from 'react'

const DonationCard = (props) => {
    if (props.item) {
        return (
                <li>{props.item.name}</li>
        );
    } else {
        return null
    }
}

export default DonationCard