import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 6px;
    margin: 36px 0 30px;

    h1{
        font-size: 20px;
        margin: 0;
        color: ${COLOR.black};
        line-height: 22px;
    }
    p{
        font-size: 12px;
        font-weight: 800;
        line-height: 16px;
        color: ${COLOR.gray4};
    }
`

function Title ({title, subtitle, iconSrc}) {
    
    return(
        <Wrapper>
            {iconSrc && <img src={iconSrc} alt="header"/>}
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </Wrapper>
    )
}

Title.defaultProps = {
    title : "셀러리 모니터링",
    subtitle : "동국이의 두번째 작업"
}


export default Title
