import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TextButton from './TextButton'

const Wrapper = styled.div`
    display: inline-flex;
    gap: 4px;
`

function ButtonGroup ({ buttons, defaultSelected, callback }) {
    const [selected, setSelected] = useState(defaultSelected)
    useEffect(() => {
        callback(selected)
    }, [selected, callback])
    return(
        <Wrapper>
            {buttons.map((button,index) => 
                <TextButton
                    key={index}
                    theme={selected === index ? "primary" : "mono"}
                    onClick={() => setSelected(index)}
                >
                    {button.title}
                </TextButton>
            )}
        </Wrapper>
    )
}

export default ButtonGroup
