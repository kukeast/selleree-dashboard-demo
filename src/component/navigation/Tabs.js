import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
`

const TabWrapper = styled(NavLink)`
    padding: 12px;
    display: inline-flex;
    font-size: 16px;
    border-radius: 8px;
    transition: 0.3s;
    background-color: ${COLOR.white};
    font-weight: 400;
    color: ${COLOR.gray6};
    &:hover{
        background-color: ${COLOR.gray1};
    }
    &:active{
        background-color: ${COLOR.gray2};
    }
    &.selected{
        background-color: ${COLOR.main1};
        font-weight: bold;
        color: ${COLOR.main};
        &:hover{
            background-color: ${COLOR.main2};
        }
        &:active{
            background-color: ${COLOR.main3};
        }
    }
`
function Tabs ({ tabs }) {
    return(
        <Wrapper>
            {tabs.map(tab => (
                <TabWrapper 
                    to={tab.path}
                    activeClassName="selected"
                    exact={tab.path === "/"}
                    key={tab.id}
                >
                    {tab.title}
                </TabWrapper>
            ))}
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
