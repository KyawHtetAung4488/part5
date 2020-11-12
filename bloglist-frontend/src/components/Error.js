import React from 'react'

const Error = ({errorMessage}) => {
    return (
        errorMessage ?
        <div className="error">
            {errorMessage}
        </div> :
        null
    )
}

export default Error