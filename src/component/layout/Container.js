import React from 'react'
import '../../App.scss'

function Container ({children, className}) {
    return(
        <div className={["ContainerWrapper", className].join(' ')}>
            <div className="Container">
                {children}
            </div>
        </div>
    )
}

export default Container
