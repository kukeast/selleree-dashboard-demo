import React from 'react'
import { ICON } from '../../constants/icon'

function Icon ({ size, color, name }) {
    return(
        <svg width={size} height={size} fill={color} xmlns="http://www.w3.org/2000/svg">
            {ICON[name]}
        </svg>
    )
}

Icon.defaultProps={
    size: 24,
    color: "#222222",
    name: "home"
}

export default Icon
