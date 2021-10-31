import React from 'react'
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import Skeleton from './Skeleton';

const Wrapper = styled.div`
    font-size: 16px;
    color: ${COLOR.black};
    transition: 0.2s;
`

function SkeletonProduct () {
    return(
        <Wrapper>
            <Skeleton 
                style={{
                    width: "100%",
                    paddingTop: "100%",
                    borderRadius: "8px",
                }}
            />
            <Skeleton 
                style={{
                    maxWidth: "50px",
                    marginTop: "10px",
                    height: "15px",
                    borderRadius: "4px",
                }}
            />
            <Skeleton 
                style={{
                    maxWidth: "160px",
                    marginTop: "6px",
                    height: "21px",
                    borderRadius: "4px",
                }}
            />
            <Skeleton 
                style={{
                    maxWidth: "140px",
                    marginTop: "6px",
                    height: "21px",
                    borderRadius: "4px",
                }}
            />
            <Skeleton 
                style={{
                    maxWidth: "40px",
                    marginTop: "10px",
                    height: "26px",
                    borderRadius: "8px",
                }}
            />
        </Wrapper>
    )
}

export default React.memo(SkeletonProduct)
