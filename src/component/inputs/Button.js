import React from 'react'
import classNames from 'classnames'
import '../../App.scss'

function Button ({button, onClick, currentButton}) {
    return(
        <div 
            className={classNames(
                "Button", 
                button.type, 
                {"selected" : currentButton === button.id}
            )}
            onClick={() => 
                button.status !== 'selected' 
                    ? onClick(button.id) 
                    : undefined 
                }
        >
            {button.withIcon && <img src={button.iconSrc} alt="button"/> }
            {button.title}
        </div>
    )
}
Button.defaultProps = {
    button : {
    },
    onClick : undefined,
    currentButton : 0
}
export default Button
