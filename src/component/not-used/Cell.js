import React from 'react'
import classNames from 'classnames'

function Cell ({data, id, onClick, className}) {
    return(
        <div 
            className={classNames(className)}
            onClick={() => 
                onClick !== undefined 
                    ? onClick(id) 
                    : undefined
            }
        >
            {data}
        </div>
    )
}

export default React.memo(Cell)
