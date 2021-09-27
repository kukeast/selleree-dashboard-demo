import React from 'react'

function Dim ({hide, onClick}) {
    return(
        <div 
            className={["Dim", hide].join(' ')}
            onClick={onClick}
        />
    )
}

export default Dim
