import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    .Tab{
        padding: 12px 0;
        display: inline-flex;

        color: ${COLOR.gray5};
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;

        &.selected{
            padding: 12px 0 10px;
            border-bottom: 2px solid ${COLOR.main};
            color: ${COLOR.main};
            font-weight: 800;
            &:hover{
                color: ${COLOR.main};
            }
        }
        &:hover{
            color: ${COLOR.black};
        }
    }
    .Tab + .Tab {
        margin-left: 30px;
    }
`

function Tabs ({tabs}) {
    return(
        <Wrapper>
            {tabs.map(
                tab => (
                    <NavLink 
                        to={tab.path}
                        activeClassName="selected"
                        className="Tab"
                        exact={tab.path === "/"}
                        key={tab.id}
                    >
                        {tab.title}
                    </NavLink>
                )
            )} 
        </Wrapper>
    )
}

Tabs.defaultProps = {
    tabs : [
        {
            id : 1,
            title : "Tab"
        }
    ]
}

export default Tabs
