import React from 'react'

const About = (props) => {
    if (props.user !== {}) {
        if (props.user.about) {
            return (
                <div>
                    <h4>About:</h4>
                    <p>{props.user.about}</p>
                </div>
            );
        } else {
            return null
        }
    } else {
        return null
    }
}

export default About