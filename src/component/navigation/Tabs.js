import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { COLOR } from '../../constants/color'
import Icon from '../../component/data-display/Icon'
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 8px;
    @media screen and (max-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }
`

const TabWrapper = styled(NavLink)`
    padding: 8px 10px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 20px;
    border-radius: 8px;
    transition: 0.3s;
    background-color: ${COLOR.white};
    font-weight: 400;
    color: ${COLOR.gray6};
    &:hover{
        background-color: ${COLOR.gray1};
    }
    &.selected{
        background-color: ${props => props.color}1a;
        color: ${COLOR.black};
        &:hover{
            background-color: ${props => props.color}33;
        }
    }
`
const Title = styled.p`
    @media screen and (max-width: 768px) {
        display: none;
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
                    color={tab.color}
                >
                    {tab.icon && <Icon name={tab.icon} color={tab.color} size={16}/>}
                    <Title>{tab.title}</Title>
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
