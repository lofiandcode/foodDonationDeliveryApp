import React from 'react'

const Donation = (props) => {
    console.log("Donation props = ", props)
    if (props.items) {
        if (props.items.length > 0) {
            console.log(props.items[0].name)
            return (
                <div>
                    <h4>Donations:</h4>
                    <p>{props.items[0].name}</p>
                </div>
            );
        } else {
            return null;
        }
    } else {
        return null;
    }
    
};

export default Donation