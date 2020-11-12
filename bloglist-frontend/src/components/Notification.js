import React from 'react'

const Notification = ({noti}) => {
    return (
        noti ? 
        <div className="noti">
            {noti}
        </div> :
        null
    )
}
export default Notification