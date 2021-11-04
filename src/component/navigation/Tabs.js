import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    position: relative;
`

const TabWrapper = styled(NavLink)`
    padding: 12px 0;
    display: inline-flex;
    color: ${COLOR.gray5};
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    transition: 0.3s;
    &.selected{
        color: ${COLOR.main};
        font-weight: 800;
        &:hover{
            color: ${COLOR.main};
        }
    }
    &:hover{
        color: ${COLOR.black};
    }
    &+&{
        margin-left: 30px;
    }
`
const BottomLine = styled.div`
    position: absolute;
    width: ${props => props.bottomLine.width}px;
    left: ${props => props.bottomLine.left}px;
    height: 2px;
    bottom: 0;
    background-color: ${COLOR.main};
    transition: 0.3s;
`

function Tabs ({tabs}) {
    const activeTabElem = useRef()
    const [bottomLine, setBottomLine] = useState({
        width: 0,
        left: null,
    })
    useEffect(() => {
        setBottomLine({
            width: activeTabElem.current.offsetWidth,
            left: activeTabElem.current.offsetLeft,
        })
    }, [])
    return(
        <Wrapper>
            {tabs.map(
                tab => (
                    <TabWrapper 
                        to={tab.path}
                        activeClassName="selected"
                        exact={tab.path === "/"}
                        key={tab.id}
                        onClick={e => setBottomLine({
                            width: e.target.offsetWidth,
                            left: e.target.offsetLeft,
                        })}
                        ref={window.location.pathname === tab.path ? activeTabElem : null}
                    >
                        {tab.title}
                    </TabWrapper>
                )
            )}
            <BottomLine bottomLine={bottomLine}/>
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
