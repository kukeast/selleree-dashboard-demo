import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    display: flex;
    gap: 6px;
    margin-bottom: 16px;
`

const TabWrapper = styled(NavLink)`
    padding: 12px;
    display: inline-flex;
    /* color: ${COLOR.gray5}; */
    font-size: 16px;
    /* font-weight: 500; */
    /* line-height: 20px; */
    border-radius: 8px;
    transition: 0.3s;
    background-color: ${COLOR.white};
    font-weight: 400;
    color: ${COLOR.gray6};
    &:hover{
        background-color: ${COLOR.gray1};
    }
    &.selected{
        /* color: ${COLOR.main};
        font-weight: 800;
        &:hover{
            color: ${COLOR.main};
        } */
        background-color: ${COLOR.main1};
        font-weight: bold;
        color: ${COLOR.main};
        &:hover{
            background-color: ${COLOR.main2};
        }
    }
    /* &:hover{
        color: ${COLOR.black};
    } */
    /* &+&{
        margin-left: 30px;
    } */
`
// const BottomLine = styled.div`
//     position: absolute;
//     width: ${props => props.bottomLåine.width}px;
//     left: ${props => props.bottomLine.left}px;
//     height: 2px;
//     bottom: 0;
//     background-color: ${COLOR.main};
//     transition: 0.3s;
// `

function Tabs ({tabs}) {
    // const activeTabElem = useRef()
    // const [bottomLine, setBottomLine] = useState({
    //     width: 0,
    //     left: null,
    // })
    // useEffect(() => {
    //     setBottomLine({
    //         width: activeTabElem.current.offsetWidth,
    //         left: activeTabElem.current.offsetLeft,
    //     })
    // }, [])
    return(
        <Wrapper>
            {tabs.map(
                tab => (
                    <TabWrapper 
                        to={tab.path}
                        activeClassName="selected"
                        exact={tab.path === "/"}
                        key={tab.id}
                        // onClick={e => setBottomLine({
                        //     width: e.taårget.offsetWidth,
                        //     left: e.target.offsetLeft,
                        // })}
                        // ref={window.location.pathname === tab.path ? activeTabElem : null}
                    >
                        {tab.title}
                    </TabWrapper>
                )
            )}
            {/* <BottomLine bottomLine={bottomLine}/> */}
        </Wrapper>
    )
}

Tabs.defaultProps = {
    tabs : [{
        id : 1,
        title : "Tab"
    }]
}

export default Tabs
