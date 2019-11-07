import React from 'react'

const User = (props) => {
    // console.log('User component props = ', props)
    if (props.user !== {}) {
        return (
            <div>
                <h1>
                    {props.user.name}
                </h1>
            </div>
        );
    } else {
        return null
    }
}

export default User