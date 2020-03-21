import React from 'react'

const Contact = (props) => {
    if (props.user.locations) {
        if (props.user.locations.length > 0) {
            return (
                <div>
                    <h4>Contact:</h4>
                    <p>{props.user.locations[0].address}</p>
                    <p>{props.user.phoneNum}</p>
                </div>
            );
        } else {
            return null;
        }
    } else {
        return null;
    }
    
};

export default Contact