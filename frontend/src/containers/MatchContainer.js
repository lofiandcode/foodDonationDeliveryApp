import React from 'react'

const MatchContainer = (props) => {
        console.log('MatchContainer props = ',props)
        if (props.driver.name) {
            return (
                <div>
                    <h4>Donations Reading for Delivery</h4>
                    <p>
                        Donation:<br/>
                        {props.items.name}<br/><br/>
                        Driver:<br/>
                        {props.driver.name}<br/>
                        {props.driver.phoneNum}<br/><br/>
                        Pick Up Location:<br/>
                        {props.donor.name}<br/>
                        {props.donor.address}<br/><br/>
                        Deliver Location:<br/>
                        {props.food_bank.name}<br/>
                        {props.food_bank.address}
                    </p>
                </div>
            );
        } else {
            return null
        }
    
}

export default MatchContainer