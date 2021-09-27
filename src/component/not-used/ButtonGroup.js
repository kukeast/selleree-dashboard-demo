import React, {useEffect, useState} from 'react'
import Button from './Button';

function ButtonGroup ({buttons, callback}) {
    const [currentButton, setCurrentButton] = useState(0)

    useEffect(() => {
        callback(currentButton)
    }, [callback, currentButton])

    const changeSelected = id => {
        if(currentButton !== id){
            setCurrentButton(id)
        }
    }

    return(
        <div className="ButtonGroup">
            {
                buttons.map(
                    button => (<Button 
                        button={button} 
                        key={button.id}
                        currentButton={currentButton}
                        disabled={button.disabled}
                        onClick={changeSelected}
                    />)
                )
            } 
        </div>
    )
}

ButtonGroup.defaultProps = {
    buttons : [
        {
            id : 0,
            title : "Button"
        }
    ]
}

export default ButtonGroup
