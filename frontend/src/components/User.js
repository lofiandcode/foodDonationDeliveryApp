import React from 'react'

const User = (props) => {
     console.log(props)
    return (
        <div>
            <h1>
                {props.user.name}
            </h1>
        </div>
    );
}

export default User